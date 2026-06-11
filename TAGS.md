# Git Tags

This document lists all git tags and release versions for this project.

## Active Tags

### v1.0.1 (Latest)

- **Date:** June 11, 2026
- **Status:** Latest Release
- **Description:** Quality & Development Process Improvements
- **Highlights:**
  - Git-Cliff integration for automated changelog generation
  - Dependency audit integration with pre-commit hooks
  - Comprehensive quality assurance tooling
  - Enhanced metadata and documentation

**View tag:**

```bash
git show v1.0.1
git log v1.0.1 -1
```

### v1.0.0 (Initial Release)

- **Date:** June 10, 2026
- **Status:** Stable Release
- **Description:** Initial MVP Release
- **Features:**
  - Core interview simulator with AI-driven Q&A
  - Groq API integration
  - Speech recognition and text-to-speech
  - Resume upload support
  - Scorecard generation
  - Multiple interviewer personas
  - Real-time SSE streaming
  - Full TypeScript and quality tooling

**View tag:**

```bash
git show v1.0.0
git log v1.0.0 -1
```

## Tagging Conventions

This project follows [Semantic Versioning](https://semver.org/):

- **MAJOR** version (v1.0.0) — Incompatible API changes
- **MINOR** version (v1.0.x) — New functionality (backwards compatible)
- **PATCH** version (v1.0.0.x) — Bug fixes (backwards compatible)

Format: `vMAJOR.MINOR.PATCH`

## Creating New Tags

```bash
# Create an annotated tag (recommended)
git tag -a vX.Y.Z -m "Release vX.Y.Z"

# Create a lightweight tag
git tag vX.Y.Z

# Push tags to remote
git push --tags

# Push a specific tag
git push origin vX.Y.Z
```

## Listing Tags

```bash
# List all tags
git tag -l

# List tags with descriptions
git tag -n10

# List tags in reverse order (newest first)
git tag -l --sort=-version:refname

# Show commits for a specific tag
git log v1.0.1 -1
```

## Release Workflow

1. Ensure all tests pass: `bun run test`
2. Run quality checks: `bun run quality`
3. Update version in `package.json`
4. Generate changelog: `bun run changelog`
5. Create annotated tag: `git tag -a vX.Y.Z -m "Release vX.Y.Z"`
6. Push changes and tags:
   ```bash
   git push
   git push --tags
   ```

## Version History

| Version | Release Date | Type  | Status |
| ------- | ------------ | ----- | ------ |
| v1.0.1  | 2026-06-11   | Minor | Latest |
| v1.0.0  | 2026-06-10   | Major | Stable |

## References

- [CHANGELOG.md](CHANGELOG.md) — Full change history
- [.release-notes](.release-notes) — Release notes for v1.0.1
- [docs/metadata.md](docs/metadata.md) — Project metadata
