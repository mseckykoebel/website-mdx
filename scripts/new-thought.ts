#!/usr/bin/env bun
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";

const args = process.argv.slice(2);

function getFlag(name: string): string | undefined {
  const idx = args.indexOf(name);
  if (idx === -1 || idx === args.length - 1) return undefined;
  return args[idx + 1];
}

function hasFlag(name: string): boolean {
  return args.includes(name);
}

const title = getFlag("--title");
const contentArg = getFlag("--content");
const contentFilePath = getFlag("--content-file");
const dateArg = getFlag("--date");
const skipGit = hasFlag("--no-git");
const useFormat = hasFlag("--format");

const today = new Date().toISOString().split("T")[0];

const hasContent = contentArg !== undefined || contentFilePath !== undefined;

if (!title) {
  console.error('Usage: bun run new-thought --title "TITLE" --content "HERE"');
  console.error(
    '   or: bun run new-thought --title "TITLE" --content-file <path>'
  );
  console.error(
    "   or: echo 'content' | bun run new-thought --title \"TITLE\" --content -"
  );
  console.error("");
  console.error("Required:");
  console.error("  --title <string>       Thought title");
  console.error("  --content <string>      Content (or - for stdin)");
  console.error(
    "  --content-file <path>   Content from file (use one of --content or --content-file)"
  );
  console.error("");
  console.error("Optional:");
  console.error("  --date <YYYY-MM-DD>    Date (default: today)");
  console.error("  --format               Use Claude to format content");
  console.error("  --no-git               Skip git add, commit, and push");
  process.exit(1);
}

if (!hasContent) {
  console.error("Error: Provide content via --content or --content-file");
  process.exit(1);
}

// Gather raw content
let rawContent = "";
if (contentFilePath) {
  rawContent = fs.readFileSync(contentFilePath, "utf-8").trim();
} else if (contentArg === "-") {
  rawContent = fs.readFileSync(0, "utf-8").trim();
} else if (contentArg) {
  rawContent = contentArg;
}

// Optionally have Claude format the content for MDX
let finalTitle = title;
let finalDate = dateArg ?? today;
let finalContent = rawContent;

if (useFormat && rawContent) {
  const jsonSchema = JSON.stringify({
    type: "object",
    properties: {
      title: {
        type: "string",
        description: "The title, with quotes escaped for YAML frontmatter",
      },
      date: {
        type: "string",
        description: "Date in YYYY-MM-DD format",
      },
      content: {
        type: "string",
        description:
          "The body content, properly formatted for MDX. Preserve markdown (bold, italics, blockquotes, code), newlines, and structure. REMOVE trailing empty bullet points (lines with only - or * and nothing after). Do not change the meaning.",
      },
    },
    required: ["title", "date", "content"],
  });

  const prompt = `Format this thought for an MDX file. Do NOT change the meaning or add content. Only format:

Title: ${title}
Date: ${finalDate}
Content:
${rawContent}

Tasks:
1. Escape any double quotes in the title for YAML frontmatter
2. Ensure the content is properly formatted for MDX - preserve all markdown (**bold**, _italics_, \`code\`, > blockquotes), newlines, and paragraph breaks
3. REMOVE trailing empty bullet points - lines that contain only "- " or "* " or "-" or "*" with nothing after. These cause rendering issues on the website
4. Use ${finalDate} for the date
5. Return the formatted title, date, and content`;

  console.log("Formatting with Claude...");

  const result = spawnSync(
    "claude",
    ["-p", prompt, "--output-format", "json", "--json-schema", jsonSchema],
    {
      encoding: "utf-8",
      maxBuffer: 10 * 1024 * 1024,
    }
  );

  if (result.error) {
    console.error("Error: Could not run 'claude'. Is Claude Code installed?");
    console.error("Install from: https://code.claude.com");
    console.error("Run without --format to skip Claude formatting.");
    process.exit(1);
  }

  if (result.status !== 0) {
    console.error("Claude failed:", result.stderr || result.stdout);
    process.exit(1);
  }

  let parsed: {
    structured_output?: { title: string; date: string; content: string };
    structuredOutput?: { title: string; date: string; content: string };
  };
  try {
    parsed = JSON.parse(result.stdout);
  } catch {
    console.error("Failed to parse Claude response.");
    process.exit(1);
  }

  const structured = parsed.structured_output ?? parsed.structuredOutput;
  if (
    !structured?.title ||
    !structured?.date ||
    structured?.content === undefined
  ) {
    console.error("Claude did not return valid output.");
    process.exit(1);
  }

  finalTitle = structured.title;
  finalDate = structured.date;
  finalContent = structured.content;
}

const slug = finalTitle
  .toLowerCase()
  .replace(/[^\w\s-]/g, "")
  .replace(/\s+/g, "-")
  .replace(/-+/g, "-")
  .trim();

const mdxContent = `---
title: "${finalTitle.replace(/"/g, '\\"')}"
date: "${finalDate}"
---

${finalContent}
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
  const run = (cmd: string, cmdArgs: string[]) => {
    const r = spawnSync(cmd, cmdArgs, { stdio: "inherit" });
    if (r.status !== 0) throw new Error(`${cmd} failed`);
  };
  try {
    run("git", ["add", filePath]);
    run("git", ["commit", "-m", `thought: ${finalTitle}`]);
    run("git", ["push"]);
    console.log("Committed and pushed.");
  } catch {
    console.error("Git command failed. File was created. Run manually:");
    console.error(
      `  git add ${filePath} && git commit -m "thought: ${finalTitle}" && git push`
    );
    process.exit(1);
  }
}
