// Pure validator for curriculum contracts: reports every authoring error in one pass.
// Never throws — callers (tests, startup) decide what to do with the returned messages.

import type { LessonStep, Subject } from './types';

export function validateSubject(subject: Subject): string[] {
  const messages: string[] = [];

  const skillIds = new Set(subject.skills.map((s) => s.id));

  const seenSkillIds = new Set<string>();
  for (const skill of subject.skills) {
    if (seenSkillIds.has(skill.id)) {
      messages.push(`duplicate skill id: ${skill.id}`);
    } else {
      seenSkillIds.add(skill.id);
    }
  }

  const seenUnitIds = new Set<string>();
  for (const unit of subject.units) {
    if (seenUnitIds.has(unit.id)) {
      messages.push(`duplicate unit id: ${unit.id}`);
    } else {
      seenUnitIds.add(unit.id);
    }

    const seenStepIds = new Set<string>();
    const stepsById = new Map<string, LessonStep>();
    for (const step of unit.steps) {
      if (seenStepIds.has(step.id)) {
        messages.push(`unit ${unit.id}: duplicate step id: ${step.id}`);
      } else {
        seenStepIds.add(step.id);
      }
      stepsById.set(step.id, step);
    }

    for (const prereq of unit.prerequisites) {
      // Prerequisites name the SKILLS a unit depends on (each introduced as an outcome by an
      // earlier unit), not other units — so they are validated against declared skill ids.
      if (!skillIds.has(prereq)) {
        messages.push(`unit ${unit.id}: unknown prerequisite: ${prereq}`);
      }
    }

    if (unit.profileId !== undefined && unit.profileId !== 'h17' && unit.profileId !== 's17') {
      messages.push(`unit ${unit.id}: unknown strategy profile: ${unit.profileId}`);
    }

    for (const outcome of unit.outcomes) {
      if (!skillIds.has(outcome)) {
        messages.push(`unit ${unit.id}: unknown outcome: ${outcome}`);
      }
    }

    if (unit.steps.length === 0) {
      messages.push(`unit ${unit.id}: has no steps`);
    }

    for (const checkId of unit.requiredChecks) {
      const step = stepsById.get(checkId);
      if (!step) {
        messages.push(`unit ${unit.id}: required check ${checkId} does not exist`);
      } else if (step.type !== 'question') {
        messages.push(`unit ${unit.id}: required check ${checkId} is not a question`);
      }
    }

    const unitOutcomeIds = new Set(unit.outcomes);
    for (const step of unit.steps) {
      if (step.type === 'question' && !unitOutcomeIds.has(step.outcomeId)) {
        messages.push(`unit ${unit.id}: question ${step.id} targets unsupported outcome ${step.outcomeId}`);
      }
    }

    // Recap coverage is only meaningful for units that declare a recap step; a unit with no
    // recap step yet is not (by itself) an authoring error the validator flags here.
    let hasRecapStep = false;
    const recapCoveredOutcomeIds = new Set<string>();
    for (const step of unit.steps) {
      if (step.type !== 'recap') continue;
      hasRecapStep = true;
      for (const capability of step.capabilities) {
        recapCoveredOutcomeIds.add(capability.outcomeId);
        if (!unitOutcomeIds.has(capability.outcomeId)) {
          messages.push(`unit ${unit.id}: recap references unknown outcome: ${capability.outcomeId}`);
        }
      }
    }
    if (hasRecapStep) {
      for (const outcome of unit.outcomes) {
        if (!recapCoveredOutcomeIds.has(outcome)) {
          messages.push(`unit ${unit.id}: recap missing outcome: ${outcome}`);
        }
      }
    }
  }

  return messages;
}
