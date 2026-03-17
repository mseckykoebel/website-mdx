import fs from "fs";
import path from "path";

const thoughtsDirectory = path.join(process.cwd(), "app/thoughts");

type Metadata = {
  title: string;
  date: string;
};

export type Thought = {
  slug: string;
  title: string;
  date: string;
  content: string;
};

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match![1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // remove quotes
    metadata[key.trim() as keyof Metadata] = value;
  });

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      slug,
      content,
      title: metadata.title,
      date: metadata.date,
    };
  });
}

export function getAllThoughts(): Thought[] {
  const thoughts = getMDXData(thoughtsDirectory);

  // sort thoughts by date (newest first)
  return thoughts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getThoughtBySlug(slug: string): Thought | undefined {
  try {
    const fullPath = path.join(thoughtsDirectory, `${slug}.mdx`);
    const { metadata, content } = readMDXFile(fullPath);

    return {
      slug,
      content,
      title: metadata.title,
      date: metadata.date,
    };
  } catch {
    return undefined;
  }
}
