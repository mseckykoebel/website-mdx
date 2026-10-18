import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// custom theme tokens for twMerge
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["title", "prose", "body", "label", "caption"],
      "font-weight": ["book", "medium-plus"],
      tracking: ["snug"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
