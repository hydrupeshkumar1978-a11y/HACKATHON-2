# Frontend Tasks

## Essential tasks

- [ ] Build landing screen with job description input
- [ ] Add persona selection UI
- [ ] Create chat transcript area with assistant and candidate messages
- [ ] Implement streaming message rendering
- [ ] Add text answer submission flow
- [ ] Store `systemPrompt`, `history`, and `currentMessage`
- [ ] Parse `<scorecard>` content and render score bars

## Speech-related tasks

- [ ] Integrate Web Speech API recognition
- [ ] Show live interim transcript during recording
- [ ] Add mic start/stop controls
- [ ] Handle microphone access denial
- [ ] Fallback gracefully to text input

## UX and polish

- [ ] Disable input while AI is streaming
- [ ] Add loading indicator for initial request
- [ ] Keep chat scroll anchored to newest message
- [ ] Add restart interview button
- [ ] Add responsive mobile layout

## AI-assisted developer notes

- Use meaningful variable names for Copilot hints
- Comment payload shapes before fetch calls
- Keep event parsing logic modular
- Use `requestAnimationFrame` for DOM updates when streaming
