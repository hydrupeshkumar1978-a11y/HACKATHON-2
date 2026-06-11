# Git-Cliff Setup Guide

This project uses **Git-Cliff** to automatically generate changelogs from conventional commits.

## Installation

Git-Cliff is written in Rust. Install it via Cargo:

```bash
cargo install git-cliff
```

Or via Homebrew (macOS):

```bash
brew install git-cliff
```

For other platforms, see [Git-Cliff releases](https://github.com/orhun/git-cliff/releases).

## Usage

Once installed, you can generate changelogs using npm scripts:

### Generate CHANGELOG.md

```bash
bun run changelog
```

This creates a complete `CHANGELOG.md` file from all commits.

### Preview unreleased changes

```bash
bun run changelog:preview
```

Shows a preview of changes since the last release without modifying the file.

### Manual git-cliff command

You can also run git-cliff directly:

```bash
# Update CHANGELOG.md
git-cliff --output CHANGELOG.md

# Preview unreleased
git-cliff --unreleased

# Generate for a specific range
git-cliff v1.0.0..HEAD
```

## Conventional Commits Format

For changelogs to work properly, use conventional commit format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat` — new feature
- `fix` — bug fix
- `docs` — documentation
- `perf` — performance improvement
- `refactor` — code refactoring
- `style` — code style (formatting, semicolons, etc.)
- `test` — test additions or changes
- `chore` — dependency updates, build config (skipped in changelog)
- `ci` — CI/CD changes (skipped in changelog)

### Examples

```bash
# Feature commit
git commit -m "feat(interview): add language auto-detection for mic input"

# Bug fix commit
git commit -m "fix(scoring): prevent scorecard from rendering multiple times"

# Breaking change
git commit -m "feat(api)!: remove deprecated /api/interview endpoint"

# With scope and body
git commit -m "feat(server): support resume uploads in DOCX format

- Added mammoth library for DOCX parsing
- Resume text is now extracted and sent to prompt builder
- Supports PDF, DOCX, and TXT formats"
```

## Configuration

The `cliff.toml` file in the project root defines:

- Commit message parsing rules
- Changelog format and grouping
- Which commit types appear in the changelog
- Breaking change detection

Edit `cliff.toml` to customize changelog generation for your needs.

## Git Hooks (Optional)

Consider adding a pre-commit hook to validate conventional commit format:

```bash
# Using husky (already in project)
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

Then install `commitlint`:

```bash
bun add -D @commitlint/config-conventional @commitlint/cli
```

## Next Steps

1. Install git-cliff on your machine
2. Start writing commits in conventional format
3. Run `bun run changelog` when you're ready to release a new version
4. Commit the `CHANGELOG.md` file as part of your release

For more info, see [git-cliff documentation](https://github.com/orhun/git-cliff).
