# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Git-Cliff integration for automated changelog generation
- Comprehensive quality and reliability checklist
- Dependency audit (`bun audit`) integration with pre-commit hooks
- Quality control script (`bun run quality`) for running all checks
- Enhanced documentation and metadata structure
- Project metadata documentation with full repository information
- Resume upload support for PDF/DOCX/TXT files
- Dark mode and lighter default theme
- Review and export transcript cleanup after TXT download
- Project compliance documentation and config files

### Changed

- Enhanced pre-commit hook with non-blocking dependency audit

### Fixed

- Pre-commit hook now allows commits even with audit warnings
- Speech recognition transcript duplication fixed

### Documentation

- Added comprehensive quality checklist
- Added Git-Cliff setup guide
- Added project metadata documentation
- Added release management guidelines
- Added Conventional Commits guidelines

## [1.0.1] - 2026-06-11

### Added

- Git-Cliff configuration for automated changelog generation
- Enhanced pre-commit hook with git-cliff metadata
- GitHub remote configuration in cliff.toml
- Project metadata documentation

### Changed

- Enhanced dependency audit to be non-blocking in pre-commit hook
- Improved git-cliff configuration with project metadata

### Fixed

- Pre-commit hook audit integration now allows commits

## [1.0.0] - 2026-06-10

### Added

- Core interview simulator with AI-driven Q&A
- Groq API integration for instant responses
- Browser-based SPA with vanilla JavaScript
- Speech recognition support (Web Speech API)
- Text-to-speech output (Web SpeechSynthesis)
- Resume upload support (PDF, DOCX, TXT)
- Scorecard generation and display
- Real-time SSE streaming from backend
- Multiple interviewer personas:
  - Friendly (warm and encouraging)
  - Tough (senior engineer, no vague answers)
  - HR (behavioral, STAR-method)
  - Technical (deep dives, system design)
- Model selection with temperature control
- Transcript review and export
- API debug panel
- Keyboard shortcuts support
- Dark mode and light theme toggle
- Responsive design for all devices
- Bun runtime with TypeScript
- Full type safety with zero config
- Comprehensive documentation
- Multi-round interview practice sessions
- Local session persistence with localStorage

### Security

- Environment variable configuration
- No sensitive data in client code
- Secret scanning integration
- Dependency vulnerability auditing

### Quality & Development

- TypeScript type checking
- ESLint for code linting
- Prettier for code formatting
- Biome for all-in-one checks
- Oxlint for ultra-fast linting
- Knip for unused code detection
- Husky for automated git hooks
- Vitest for unit testing
- Coverage tracking

### Documentation

- System architecture documentation
- Client-server state flow diagrams
- SSE streaming architecture
- Prompt pipeline documentation
- Setup and local development guides
- Deployment instructions
- Environment variables reference
- Troubleshooting guide
- Product requirements
- Scoring system specification
- Interview flow documentation

### CI/CD

- Pre-commit hooks with Husky
- Automated linting and formatting
- Secret scanning in commits
- Type checking in commits

---

## Version History

### v1.0.1 (Current - Quality & Release Process)

- Automated changelog generation with Git-Cliff
- Enhanced dependency auditing and reporting
- Comprehensive quality assurance tooling
- Complete metadata documentation
- Release management guidelines

### v1.0.0 (MVP Release)

- Complete AI interview simulator
- Full feature set for interview practice
- Production-ready with security and quality checks

---

## Contributing

When making changes, follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `perf:` Performance improvement
- `refactor:` Code refactoring
- `style:` Code formatting
- `test:` Test additions
- `chore:` Build config, dependencies

### Example Commits

```bash
# Feature
git commit -m "feat(interview): add language support for Hindi and Telugu"

# Bug fix
git commit -m "fix(scoring): prevent scorecard from rendering multiple times"

# Documentation
git commit -m "docs(readme): update setup instructions"

# Breaking change
git commit -m "feat(api)!: remove deprecated /api/interview endpoint"
```

---

## Release Process

1. Update version in `package.json`
2. Run quality checks: `bun run quality`
3. Generate changelog: `bun run changelog`
4. Create annotated tag: `git tag -a vX.Y.Z -m "Release vX.Y.Z"`
5. Push changes and tags: `git push && git push --tags`

---

## Support

For issues, questions, or feature requests, refer to:

- [README.md](README.md) — Quick start guide
- [docs/troubleshooting.md](docs/troubleshooting.md) — Common issues
- [docs/quality-checklist.md](docs/quality-checklist.md) — Quality tools
- [docs/metadata.md](docs/metadata.md) — Project metadata

---

## License

AGPL-3.0-or-later
