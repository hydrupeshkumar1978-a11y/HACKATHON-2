# AI Tasks

## Prompt engineering

- [ ] Define a persona mapping block for each interviewer style
- [ ] Add explicit rules for one-question-at-a-time
- [ ] Require a final `<scorecard>` output block
- [ ] Keep the job description and rules separated clearly

## Groq integration

- [ ] Use `groq-sdk` with `groq/compound-mini`
- [ ] Enable `stream: true` on requests
- [ ] Confirm the SDK returns incremental `delta` content
- [ ] Validate model outputs during testing
 - [x] Use `groq-sdk` with `groq/compound-mini`
 - [x] Enable `stream: true` on requests
 - [x] Confirm the SDK returns incremental `delta` content
 - [x] Validate model outputs during testing

## Scoring and quality

- [ ] Create a scorecard parser for frontend
- [ ] Test edge cases where model output includes stray tags
- [ ] Tune prompts for consistent final summaries
 - [x] Create a scorecard parser for frontend
 - [x] Test edge cases where model output includes stray tags
 - [ ] Tune prompts for consistent final summaries

## Future AI enhancements

- [ ] Add adaptive follow-up logic based on previous answer quality
- [ ] Add STAR-analysis prompts for behavioral questions
- [ ] Add a `technical depth` follow-up assistant prompt
