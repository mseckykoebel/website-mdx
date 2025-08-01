import fs from "fs";
import path from "path";

const postsDirectory = path.join(process.cwd(), "app/posts");

type Metadata = {
  title: string;
  date: string;
  imageSource?: string;
  alt?: string;
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  imageSource?: string;
  alt?: string;
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
      imageSource: metadata.imageSource,
      alt: metadata.alt,
    };
  });
}

export function getAllPosts(): Post[] {
  const posts = getMDXData(postsDirectory);
  
  // sort posts by date (newest first)
  return posts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostBySlug(slug: string): Post | undefined {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const { metadata, content } = readMDXFile(fullPath);

    return {
      slug,
      content,
      title: metadata.title,
      date: metadata.date,
      imageSource: metadata.imageSource,
      alt: metadata.alt,
    };
  } catch {
    return undefined;
  }
}

export function formatDate(date: string, includeRelative = false) {
  const currentDate = new Date();
  let targetDate: Date;
  
  if (!date.includes("T")) {
    targetDate = new Date(`${date}T00:00:00`);
  } else {
    targetDate = new Date(date);
  }

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  const fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
