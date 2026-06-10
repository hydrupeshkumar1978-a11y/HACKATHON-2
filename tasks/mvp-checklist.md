# MVP Checklist

## Core functionality

- [x] Bun backend serves static files and APIs
- [x] `POST /api/start` initializes the interview
- [x] `POST /api/reply` sends candidate answers
- [x] Groq streaming works with `groq/compound-mini`
- [x] Frontend renders live AI token stream
- [x] Scorecard is parsed and displayed
- [x] Client holds `systemPrompt` and full `history`

## UI and UX

- [x] Job description entry screen
- [x] Persona selector
- [x] Chat transcript panel
- [x] Text answer input
- [x] Speech mic support placeholder
- [x] Light theme by default with dark mode toggle
- [x] Resume upload support for PDF/DOCX/TXT files
- [x] Text-to-speech playback (toggleable)

## Quality and reliability

- [x] Clear SSE event handling
- [x] Validation for missing input
- [x] Proper error messages for API failures
- [x] Minimal external dependencies

## Documentation

- [x] Architecture docs
- [x] Setup instructions
- [x] Prompt and scoring spec
- [x] Planning and task tracking files

Additional implemented features:

- [x] Model selector & temperature control
- [x] Review & Export transcript
- [x] API debug panel
- [x] Keyboard shortcuts

## Hackathon MVP scope

- Focus on working interview loop first
- Add speech support after text flow is stable
- Keep the design simple and responsive
