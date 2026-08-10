import React, { isValidElement, type ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";

function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
  const headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));

  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/")) {
    return <Link href={href} {...props} />;
  }

  if (href.startsWith("#")) {
    return <a href={href} {...props} />;
  }

  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props: any) {
  // for external images, we need width and height
  // if not provided, use regular img tag
  if (props.src?.startsWith("http") && (!props.width || !props.height)) {
    return <img alt={props.alt} className="rounded-lg" {...props} />;
  }

  return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

function Code({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"code">) {
  // fenced blocks arrive as `language-x`; bare inline code stays unhighlighted
  // so prose like `npm run dev` isn't colored as if it were source
  const isBlock = typeof className === "string" && className.includes("language-");

  if (!isBlock || typeof children !== "string") {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }

  // sugar-high escapes its input; MDX here is first-party only
  return (
    <code
      className={className}
      dangerouslySetInnerHTML={{ __html: highlight(children) }}
      {...props}
    />
  );
}

function Pre({ children, ...props }: ComponentPropsWithoutRef<"pre">) {
  const language =
    isValidElement<{ className?: string }>(children) &&
    typeof children.props.className === "string"
      ? children.props.className.replace(/^.*language-/, "")
      : undefined;

  return (
    <pre data-language={language} {...props}>
      {children}
    </pre>
  );
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: number) {
  const Heading = ({ children }: any) => {
    const slug = slugify(children);

    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

function UnorderedList({ children, ...props }: any) {
  return (
    <ul className="list-outside ml-6 [&_li]:pl-6 [&_li]:-indent-6" {...props}>
      {children}
    </ul>
  );
}

function OrderedList({ children, ...props }: any) {
  return (
    <ol className="list-outside ml-6 [&_li]:pl-6 [&_li]:-indent-6" {...props}>
      {children}
    </ol>
  );
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  img: RoundedImage,
  a: CustomLink,
  code: Code,
  pre: Pre,
  ul: UnorderedList,
  ol: OrderedList,
  Table,
};

export function CustomMDX(props: any) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
