# Project Metadata

## Repository Information

- **Name:** Interview Simulator
- **Description:** A browser-based interview simulator with AI-driven Q&A, resume uploads, and transcript export.
- **License:** AGPL-3.0-or-later
- **Repository:** https://code.swecha.org/hydrupeshkumar/hackathon-2.git

## Version Information

| Version | Release Date | Status |
| ------- | ------------ | ------ |
| 1.0.1   | Current      | Latest |
| 1.0.0   | Initial      | Stable |

## Project Metadata

### Keywords

- interview
- simulator
- AI
- resume
- chatbot
- Bun
- Groq

### Author

- Name: Hyd Rupesh Kumar
- Email: hydrupeshkumar@gmail.com

### Technologies

**Runtime & Build:**

- Bun (runtime + package manager)
- TypeScript (language)

**Backend:**

- Bun HTTP server
- Groq SDK for AI integration
- PDF-parse (resume extraction)
- Mammoth (DOCX parsing)

**Frontend:**

- Vanilla JavaScript SPA
- Web Speech API (speech recognition)
- Web SpeechSynthesis (text-to-speech)
- Server-Sent Events (SSE streaming)

**Quality & Development:**

- ESLint (linting)
- Prettier (formatting)
- Biome (all-in-one toolchain)
- Oxlint (ultra-fast linting)
- Knip (unused code detection)
- Husky (git hooks)
- Vitest (testing)
- TypeScript (type checking)
- Git-Cliff (changelog generation)

## Git Tags

```bash
# View all tags
git tag -l

# View tag descriptions
git tag -n10

# Current tags:
# v1.0.0 - Release v1.0.0
# v1.0.1 - Release v1.0.1
```

## Documentation Structure

```
documentation/
├── README.md                          # Quick start guide
├── docs/
│   ├── setup.md                       # Local development setup
│   ├── deployment.md                  # Deployment instructions
│   ├── environment-variables.md       # Configuration reference
│   ├── local-development.md           # Dev environment guide
│   ├── troubleshooting.md            # Common issues
│   └── quality-checklist.md          # Quality assurance tools
├── architecture/
│   ├── system-architecture.md        # Overall system design
│   ├── client-server-state-flow.md   # Data flow diagram
│   ├── sse-streaming-architecture.md # Real-time streaming
│   └── prompt-pipeline.md            # AI prompt handling
├── specs/
│   ├── product-requirements.md       # PRD
│   ├── interview-flow.md             # Interview flow spec
│   ├── scoring-system.md             # Scoring algorithm
│   ├── speech-input-spec.md         # Speech recognition spec
│   └── realtime-streaming-spec.md   # Streaming spec
├── prompts/
│   ├── behavioral-question-prompt.md
│   ├── frontend-interview-prompt.md
│   ├── hr-round-prompt.md
│   ├── interviewer-system-prompt.md
│   └── scoring-prompt.md
├── plans/
│   ├── ai-integration-plan.md
│   ├── backend-plan.md
│   ├── deployment-plan.md
│   ├── frontend-plan.md
│   ├── scalability-plan.md
│   └── speech-input-plan.md
├── tasks/
│   ├── mvp-checklist.md              # MVP completion status
│   ├── backend-tasks.md
│   ├── frontend-tasks.md
│   ├── ai-tasks.md
│   └── polish-features.md
└── templates/
    ├── plan-template.md
    ├── prompt-template.md
    ├── spec-template.md
    └── task-template.md
```

## Release Management

### Creating a Release

1. Update `package.json` version
2. Ensure all tests pass: `bun run test`
3. Run quality checks: `bun run quality`
4. Generate changelog: `bun run changelog`
5. Create annotated tag: `git tag -a vX.Y.Z -m "Release vX.Y.Z"`
6. Push tags: `git push --tags`

### Git-Cliff Configuration

- **File:** `cliff.toml`
- **Supports:** Conventional commits parsing
- **Output:** Automatically generated CHANGELOG.md

## API Endpoints

| Endpoint             | Method | Purpose                      |
| -------------------- | ------ | ---------------------------- |
| `/api/start`         | POST   | Initialize interview session |
| `/api/reply`         | POST   | Send candidate answer        |
| `/api/upload-resume` | POST   | Upload resume file           |

## Configuration Files

| File                | Purpose                            |
| ------------------- | ---------------------------------- |
| `package.json`      | Project metadata and scripts       |
| `tsconfig.json`     | TypeScript configuration           |
| `vitest.config.ts`  | Testing configuration              |
| `knip.config.js`    | Unused code detection              |
| `cliff.toml`        | Changelog generation               |
| `.env`              | Environment variables (not in git) |
| `.eslintrc`         | ESLint rules                       |
| `.prettierrc`       | Prettier formatting                |
| `.gitignore`        | Git exclusions                     |
| `.husky/pre-commit` | Pre-commit hooks                   |

## Dependencies Summary

### Production Dependencies

- `groq-sdk` (^0.8.0) — AI model API
- `pdf-parse` (^1.1.1) — PDF text extraction
- `mammoth` (^1.4.18) — DOCX parsing

### Development Dependencies

- Linting: eslint, prettier, biome, oxlint
- Testing: vitest, @vitest/coverage-v8
- Type checking: typescript, @types/node, @types/bun
- Git hooks: husky
- Code analysis: knip
- Security: gitleaks

## Scripts

```bash
# Development
bun dev              # Start dev server
bun start            # Start server

# Quality Assurance
bun run lint         # ESLint check
bun run format       # Prettier check
bun run biome        # Biome check
bun run oxlint       # Oxlint check
bun run knip         # Unused code detection
bun run typecheck    # TypeScript check
bun run audit        # Dependency audit
bun run quality      # All quality checks

# Testing
bun run test         # Run tests with coverage

# Documentation
bun run changelog    # Generate CHANGELOG.md
bun run changelog:preview  # Preview unreleased changes

# Security
bun run secret-scan  # Check for secrets
```

## Contact & Support

- **Author:** Rupesh Kumar
- **Repository:** https://code.swecha.org/hydrupeshkumar/hackathon-2.git
- **License:** AGPL-3.0-or-later
