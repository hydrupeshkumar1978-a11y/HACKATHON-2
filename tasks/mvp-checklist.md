# MVP Checklist

## Core functionality

- [x] Bun backend serves static files and APIs
- [x] `POST /api/start` initializes the interview
- [x] `POST /api/reply` sends candidate answers
- [x] Groq streaming works with `mixtral-8x7b-32768`
- [x] Frontend renders live AI token stream
- [x] Scorecard is parsed and displayed
- [x] Client holds `systemPrompt` and full `history`

## UI and UX

- [x] Job description entry screen
- [x] Persona selector
- [x] Chat transcript panel
- [x] Text answer input
- [x] Speech mic support placeholder

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

## Hackathon MVP scope

- Focus on working interview loop first
- Add speech support after text flow is stable
- Keep the design simple and responsive
