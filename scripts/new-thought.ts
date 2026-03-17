#!/usr/bin/env bun
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";

const args = process.argv.slice(2);

// Parse flags
const contentFileIdx = args.indexOf("--content-file");
const noGitIdx = args.indexOf("--no-git");
const positionalArgs = args.filter((_, i) => {
  if (
    contentFileIdx !== -1 &&
    (i === contentFileIdx || i === contentFileIdx + 1)
  )
    return false;
  if (noGitIdx !== -1 && i === noGitIdx) return false;
  return true;
});

const title = positionalArgs[0];
const dateArg = positionalArgs[1];
const contentArg = positionalArgs[2];

const useContentFile = contentFileIdx !== -1;
const contentFilePath = useContentFile ? args[contentFileIdx + 1] : null;
const skipGit = noGitIdx !== -1;

if (!title) {
  console.error("Usage: bun run new-thought <title> [date] [content]");
  console.error(
    "   or: bun run new-thought <title> [date] --content-file <path>"
  );
  console.error("   or: echo 'content' | bun run new-thought <title> [date] -");
  console.error("");
  console.error("Options:");
  console.error("  --content-file <path>  Read content from file");
  console.error("  --no-git               Skip git add, commit, and push");
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^\w\s-]/g, "")
  .replace(/\s+/g, "-")
  .replace(/-+/g, "-")
  .trim();

const date = dateArg || new Date().toISOString().split("T")[0];

let content = "";

if (contentFilePath) {
  content = fs.readFileSync(contentFilePath, "utf-8").trim();
} else if (contentArg === "-") {
  // Read from stdin
  content = fs.readFileSync(0, "utf-8").trim();
} else if (contentArg) {
  content = contentArg;
}

const mdxContent = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${date}"
---

${content}
`;

const thoughtsDir = path.join(process.cwd(), "app/thoughts");
const filePath = path.join(thoughtsDir, `${slug}.mdx`);

if (fs.existsSync(filePath)) {
  console.error(`Error: ${filePath} already exists`);
  process.exit(1);
}

fs.writeFileSync(filePath, mdxContent);
console.log(`Created: ${filePath}`);

if (!skipGit) {
  const run = (cmd: string, args: string[]) => {
    const r = spawnSync(cmd, args, { stdio: "inherit" });
    if (r.status !== 0) throw new Error(`${cmd} failed`);
  };
  try {
    run("git", ["add", filePath]);
    run("git", ["commit", "-m", `thought: ${title}`]);
    run("git", ["push"]);
    console.log("Committed and pushed.");
  } catch {
    console.error("Git command failed. File was created. Run manually:");
    console.error(
      `  git add ${filePath} && git commit -m "thought: ${title}" && git push`
    );
    process.exit(1);
  }
}
