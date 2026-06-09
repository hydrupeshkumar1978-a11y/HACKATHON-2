# Scoring Prompt

## Purpose
Provide the model with a concise scoring schema to ensure consistent evaluation output.

## Scorecard instruction

```text
At the end of the interview, provide a scorecard in the exact format below:
<scorecard>Communication: X/10 | Relevance: Y/10 | Depth: Z/10 | Overall: <one sentence summary></scorecard>
```

## Score criteria

- `Communication`: clarity, tone, structure
- `Relevance`: answer fit to the question and role
- `Depth`: specificity and technical insight

## Prompt rule examples

- Use numeric values between 1 and 10 only
- Do not include extra tags or HTML
- Use exactly one sentence in the overall summary

## Example completion

```html
<scorecard>Communication: 8/10 | Relevance: 7/10 | Depth: 6/10 | Overall: Strong communication, but the answer needs more concrete examples.</scorecard>
```

## Application notes

- The frontend parser should look for `<scorecard>` delimiters
- Any deviation requires prompt tuning
- Keep the scorecard generation rule near the top of the prompt to increase consistency
