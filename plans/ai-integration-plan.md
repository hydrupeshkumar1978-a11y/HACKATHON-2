# AI Integration Plan

## Objective
Define how the application uses Groq API and the `groq-sdk` to power the interview experience.

## Core AI flow

1. Build a deterministic `systemPrompt` from job description and persona
2. Send the prompt and user messages to Groq via `messages.create`
3. Stream output deltas from Groq to the browser
4. Expect the AI to wrap final feedback in `<scorecard>`

## Model and SDK

- Model: `groq/compound-mini`
- SDK: `groq-sdk`
- Streaming: `stream: true`

## Prompt engineering best practices

- Use clear persona definitions
- Include explicit rules for question frequency
- Require a final scorecard format
- Keep instructions concise but directive

## Example prompt section

```text
You are interviewing a candidate for the role below:
---
<Job description>
---
RULES:
- Ask one question at a time.
- Keep replies concise.
- After 6–8 exchanges, return <scorecard>...
```

## Response expectations

- Stream partial tokens immediately
- Avoid long-delayed answer blocks
- Include only one scorecard block at end
- Avoid repeating the system prompt

## Integration risks and mitigations

- Risk: model diverges from scorecard format
  - Mitigation: add explicit final output requirement

- Risk: stream disconnects
  - Mitigation: implement browser retry logic and server error `done`

- Risk: high latency
  - Mitigation: keep payload minimal and use Bun streaming

## Future AI improvements

- Add adaptive follow-up questions based on user answer quality
- Add separate persona prompt variants for HR and technical rounds
- Use AI to classify answer style as STAR, non-STAR
- Add answer helpfulness and confidence indicators
