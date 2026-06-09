# Scoring System

## Objective
Define a simple, transparent scoring system that the Groq model can return as structured feedback for communication, relevance, and depth.

## Score dimensions

- **Communication**: clarity, tone, structure, brevity
- **Relevance**: how well the response maps to the question and role
- **Depth**: specificity, examples, technical rigor, reasoning

## Scorecard format

The AI must output a scorecard block exactly in this format:

```html
<scorecard>Communication: 8/10 | Relevance: 7/10 | Depth: 6/10 | Overall: Strong communication with more detail needed.</scorecard>
```

## Parsing rules

- Detect the opening `<scorecard>` tag and closing `</scorecard>` tag
- Extract numeric values for each metric
- Preserve the final overall feedback sentence

## Scoring examples

### Example 1
- Communication: 9/10
- Relevance: 8/10
- Depth: 7/10
- Overall: Excellent structure, solid relevance, could add more technical detail.

### Example 2
- Communication: 6/10
- Relevance: 6/10
- Depth: 4/10
- Overall: Good attempt, but answers are too high level and need more concrete examples.

## Implementation guidance

- Keep scores between 1 and 10
- Favor constructive language in `Overall`
- Use only one line inside `<scorecard>`
- The frontend may render bars using score values

## Future scoring enhancements

- Add `Technique` or `Preparation` in later versions
- Track `answer length` and `response latency`
- Use AI analysis to detect `STAR` structure in behavioral answers
