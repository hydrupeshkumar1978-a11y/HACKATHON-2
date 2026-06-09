# Prompt Pipeline

## Objective
Describe how the application constructs and manages AI prompts for consistent interview behavior.

## Prompt pipeline stages

1. **Input normalization**
   - Trim whitespace from `jobDescription`
   - Set default persona to `friendly`

2. **Persona mapping**
   - Convert persona key into a descriptive prompt block

3. **System prompt assembly**
   - Insert role description
   - Add interview rules
   - Enforce final scorecard format

4. **Message history injection**
   - Append user and assistant turns in order

5. **Groq request execution**
   - Send `systemPrompt` and current messages to Groq

## Prompt template

```text
<persona instructions>

You are interviewing a candidate for the following role:
---
<jobDescription>
---
RULES:
- Ask one question at a time.
- Keep your messages concise.
- After 6–8 exchanges, wrap up with <scorecard>...
```

## Persona definitions

- `friendly`: warm and encouraging interviewer
- `tough`: direct senior engineer interviewer
- `hr`: behavioral style, STAR questions
- `technical`: system-focused deep dive

## Prompt engineering best practices

- Use explicit rules for output format
- Avoid ambiguous instructions
- Keep the role description consistent
- Add completion conditions for scorecard generation

## Candidate prompt example

```text
You are interviewing a candidate for the following role:
---
Senior frontend engineer with React and accessibility experience
---
RULES:
- Ask one question at a time.
- Keep your messages concise — 2–4 sentences.
- After the candidate answers, give one sentence of reaction and ask the next question.
- After 6–8 exchanges, wrap up with a final scorecard in <scorecard> tags.
```

## Future prompt pipeline ideas

- Separate prompt templates for question generation and scoring
- Add target persona-specific follow-up styles
- Use prompt versioning for reproducibility
