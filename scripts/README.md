# Scripts

## new-thought

Create a new thought.

```bash
# Title, date, content as args
bun run new-thought "My Title" "2025-03-17" "Your content here."
# Content from file
bun run new-thought "My Title" "2025-03-17" --content-file ./draft.md
# Content from stdin
echo "Your content" | bun run new-thought "My Title" "2025-03-17" -
# Skip git
bun run new-thought "My Title" "2025-03-17" "Content" --no-git
```
