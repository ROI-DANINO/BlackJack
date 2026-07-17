// Cycle-1 ProgressStore foundation — record shape, phantom rule, structured-clone safety.
// Design: docs/superpowers/specs/2026-07-17-progressstore-cycle1-design.md §4, §7, §9.
// No jsdom pragma: structuredClone is a Node global and the Vitest environment here is 'node'.

import { makeAttemptDraft, makeSessionRecord, makeEnvelope, makeAttemptTier } from './fixtures';
import type { AttemptDisposition, ProgressAttempt } from './types';

describe('structured-clone safety (design §9.2)', () => {
  it('structuredClone(makeAttemptDraft()) round-trips deep-equal', () => {
    const draft = makeAttemptDraft();
    const cloned = structuredClone(draft);
    expect(cloned).toEqual(draft);
  });

  it('structuredClone(makeSessionRecord()) round-trips deep-equal', () => {
    const session = makeSessionRecord();
    expect(structuredClone(session)).toEqual(session);
  });

  it('structuredClone(makeEnvelope()) round-trips deep-equal', () => {
    const envelope = makeEnvelope();
    expect(structuredClone(envelope)).toEqual(envelope);
  });
});

describe('the phantom rule (design §7)', () => {
  it('a built draft has no `planning` key at all — absence, not null', () => {
    const draft = makeAttemptDraft();
    expect('planning' in draft).toBe(false);
  });

  it('a built draft has no `prompt`, `feedback`, or `reducerVersion` keys', () => {
    const draft = makeAttemptDraft();
    expect('prompt' in draft).toBe(false);
    expect('feedback' in draft).toBe(false);
    expect('reducerVersion' in draft).toBe(false);
  });
});

describe('fixture determinism — no clock, no random', () => {
  it('makeAttemptDraft() is deterministic for the same args', () => {
    expect(makeAttemptDraft()).toEqual(makeAttemptDraft());
  });

  it('makeAttemptDraft(overrides) is deterministic for the same overrides', () => {
    const overrides = { sessionId: 'session-fixed-1' };
    expect(makeAttemptDraft(overrides)).toEqual(makeAttemptDraft(overrides));
  });

  it('makeSessionRecord() is deterministic for the same args', () => {
    expect(makeSessionRecord()).toEqual(makeSessionRecord());
  });

  it('makeEnvelope() is deterministic for the same args', () => {
    expect(makeEnvelope()).toEqual(makeEnvelope());
  });

  it('makeAttemptTier(n) is deterministic for the same n', () => {
    expect(makeAttemptTier(5)).toEqual(makeAttemptTier(5));
  });

  it('makeAttemptTier(n) returns exactly n drafts', () => {
    expect(makeAttemptTier(7)).toHaveLength(7);
  });
});

describe('ALR-022 required fixture set: correct, incorrect, retried, hinted, abandoned, ungraded', () => {
  it('accepts a correct disposition', () => {
    const draft = makeAttemptDraft({ disposition: { status: 'graded', correct: true } });
    expect(draft.disposition).toEqual({ status: 'graded', correct: true });
  });

  it('accepts an incorrect disposition with a classified error', () => {
    const disposition: AttemptDisposition = { status: 'graded', correct: false, errorClass: 'strategy-recall' };
    const draft = makeAttemptDraft({ disposition });
    expect(draft.disposition).toEqual(disposition);
  });

  it('accepts an incorrect disposition with an unclassified (null) error', () => {
    const disposition: AttemptDisposition = { status: 'graded', correct: false, errorClass: null };
    const draft = makeAttemptDraft({ disposition });
    expect(draft.disposition).toEqual(disposition);
  });

  it('accepts a retried attempt (graded + assistance:retry)', () => {
    const draft = makeAttemptDraft({
      disposition: { status: 'graded', correct: true },
      assistance: 'retry',
    });
    expect(draft.assistance).toBe('retry');
    expect(draft.disposition).toEqual({ status: 'graded', correct: true });
  });

  it('accepts a hinted attempt (graded + assistance:instruction)', () => {
    const draft = makeAttemptDraft({
      disposition: { status: 'graded', correct: true },
      assistance: 'instruction',
    });
    expect(draft.assistance).toBe('instruction');
  });

  it('accepts an abandoned disposition', () => {
    const draft = makeAttemptDraft({ disposition: { status: 'abandoned' } });
    expect(draft.disposition).toEqual({ status: 'abandoned' });
  });

  it('accepts an ungraded disposition', () => {
    const draft = makeAttemptDraft({ disposition: { status: 'ungraded' } });
    expect(draft.disposition).toEqual({ status: 'ungraded' });
  });
});

describe('type-level negative check (design §4.1)', () => {
  it('errorClass is unrepresentable on a correct disposition — enforced by tsc, not by this assertion', () => {
    // @ts-expect-error errorClass must not be assignable when correct:true
    const impossible: ProgressAttempt['disposition'] = { status: 'graded', correct: true, errorClass: 'outcome-bias' };
    // The value only exists to give tsc something to check; `tsc --noEmit` fails if the line
    // above ever stops erroring (an unused @ts-expect-error is itself a type error).
    expect(impossible).toBeDefined();
  });
});
