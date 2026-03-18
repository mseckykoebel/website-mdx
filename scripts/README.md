# Scripts

## new-thought

Create a new thought. Takes your input and structures it as MDX.

```bash
# Basic usage (date defaults to today)
bun run new-thought --title "My Title" --content "Your content here."

# Content from file
bun run new-thought --title "My Title" --content-file ./draft.md

# Content from stdin
echo "Your content" | bun run new-thought --title "My Title" --content -

# Custom date
bun run new-thought --title "My Title" --content "Content" --date "2025-03-17"

# Use Claude to format content (handles markdown, quotes, newlines)
bun run new-thought --title "My Title" --content-file ./draft.md --format

# Skip git
bun run new-thought --title "My Title" --content "Content" --no-git
```
