import { describe, it, expect } from 'vitest';

describe('server smoke test', () => {
  it('should have a valid environment', () => {
    expect(process.env.GROQ_API_KEY).toBeDefined();
  });
});
