// Blackjack Basics: beginner curriculum data (units 1-6 of 9). Pure, serializable content
// authored against the committed contracts (../types), answer-rule conventions
// (../controller resolveAnswer), and named openings (../situations). No functions, no
// strategy language — this is mechanics-first literacy, one concept per screen.
//
// Units 7-9 and the full end-to-end playthrough walk are a later task; this file only
// declares the first six units plus the full stable skill catalog they draw from.

import type { Skill, Subject, Unit } from '../types';
import { OPENINGS } from '../situations';

const SKILLS: Skill[] = [
  { id: 'goal', title: 'Explain the goal of blackjack' },
  { id: 'card-values', title: 'Recognize card values' },
  { id: 'hand-total', title: 'Read a hand total' },
  { id: 'ace-value', title: 'Use an Ace as 1 or 11' },
  { id: 'bust', title: 'Recognize a bust' },
  { id: 'round-flow', title: 'Follow a blackjack round' },
  { id: 'dealer-info', title: 'Read dealer information' },
  { id: 'hit', title: 'Explain and use Hit' },
  { id: 'stand', title: 'Explain and use Stand' },
  { id: 'outcomes', title: 'Recognize win, loss, and push' },
  { id: 'wager-result', title: 'Follow the original wager' },
  { id: 'natural-blackjack', title: 'Distinguish blackjack from ordinary 21' },
];

const MEET_BLACKJACK: Unit = {
  id: 'meet-blackjack',
  title: 'Meet Blackjack',
  goal: 'Learn what a round of blackjack is trying to accomplish and how cards are valued.',
  prerequisites: [],
  outcomes: ['goal', 'card-values'],
  requiredChecks: ['goal-check', 'face-value-check'],
  steps: [
    {
      id: 'intro',
      type: 'explain',
      title: 'What is blackjack?',
      body:
        'You play against the dealer, not other players. Number cards are worth their number. ' +
        'Jack, Queen, and King are all worth 10. The goal is to beat the dealer’s hand total ' +
        'without going over 21.',
      cards: [{ rank: 'queen', suit: 'spades' }, { rank: 'seven', suit: 'hearts' }],
    },
    {
      id: 'goal-check',
      type: 'question',
      outcomeId: 'goal',
      prompt: 'What is the goal of a round of blackjack?',
      choices: [
        { value: 'beat-dealer', label: 'Beat the dealer’s hand without going over 21' },
        { value: 'reach-21', label: 'Always reach a total of exactly 21' },
      ],
      answer: { kind: 'literal', value: 'beat-dealer' },
      correct: 'Right — beat the dealer’s total without busting.',
      incorrect: 'You are playing against the dealer. Going over 21 loses immediately.',
    },
    {
      id: 'face-value-check',
      type: 'question',
      outcomeId: 'card-values',
      prompt: 'What is a Queen worth?',
      choices: [
        { value: '10', label: '10' },
        { value: '12', label: '12' },
      ],
      answer: { kind: 'hand_total', cards: [{ rank: 'queen', suit: 'spades' }] },
      correct: 'Right — Jacks, Queens, and Kings are all worth 10.',
      incorrect: 'Jacks, Queens, and Kings are all worth 10.',
    },
    {
      id: 'recap',
      type: 'recap',
      title: 'Meet Blackjack — done',
      capabilities: [
        { outcomeId: 'goal', text: 'You can explain the goal of blackjack.' },
        { outcomeId: 'card-values', text: 'You can recognize what every card is worth.' },
      ],
    },
  ],
};

const READ_YOUR_HAND: Unit = {
  id: 'read-your-hand',
  title: 'Read Your Hand',
  goal: 'Read a hand total, use an Ace as 1 or 11, and recognize a bust.',
  prerequisites: ['card-values'],
  outcomes: ['hand-total', 'ace-value', 'bust'],
  requiredChecks: ['soft-total-check', 'ace-adjust-check', 'bust-check'],
  steps: [
    {
      id: 'intro',
      type: 'explain',
      title: 'Reading a hand total',
      body:
        'Add up the cards in a hand to get its total. An Ace is special: it can count as 1 or ' +
        'as 11, whichever keeps the hand from busting. A hand over 21 is a bust and loses.',
      cards: [{ rank: 'ace', suit: 'clubs' }, { rank: 'six', suit: 'diamonds' }],
    },
    {
      id: 'soft-total-check',
      type: 'question',
      outcomeId: 'hand-total',
      prompt: 'Ace + 6 — what is the best total?',
      choices: [
        { value: '17', label: '17' },
        { value: '7', label: '7' },
      ],
      answer: { kind: 'hand_total', cards: [{ rank: 'ace', suit: 'clubs' }, { rank: 'six', suit: 'diamonds' }] },
      correct: 'Right — counting the Ace as 11 gives a total of 17.',
      incorrect: 'The Ace can count as 11 here, so the best total is 17.',
    },
    {
      id: 'ace-adjust-check',
      type: 'question',
      outcomeId: 'ace-value',
      prompt: 'Ace + 6 + 10 — what is the best total now?',
      choices: [
        { value: '17', label: '17' },
        { value: '27', label: '27' },
      ],
      answer: {
        kind: 'hand_total',
        cards: [
          { rank: 'ace', suit: 'clubs' }, { rank: 'six', suit: 'diamonds' }, { rank: 'ten', suit: 'hearts' },
        ],
      },
      correct: 'Right — the Ace switches to counting as 1, for a total of 17.',
      incorrect: 'Counting the Ace as 11 would bust, so it changes to 1.',
    },
    {
      id: 'bust-check',
      type: 'question',
      outcomeId: 'bust',
      prompt: '10 + 8 + 5 — is this hand a bust?',
      choices: [
        { value: 'bust', label: 'Yes, it busts' },
        { value: 'not_bust', label: 'No, it does not bust' },
      ],
      answer: {
        kind: 'hand_bust',
        cards: [
          { rank: 'ten', suit: 'hearts' }, { rank: 'eight', suit: 'clubs' }, { rank: 'five', suit: 'diamonds' },
        ],
      },
      correct: 'Right — 23 is over 21, so this hand busts.',
      incorrect: 'The total is 23; any total over 21 is a bust.',
    },
    {
      id: 'recap',
      type: 'recap',
      title: 'Read Your Hand — done',
      capabilities: [
        { outcomeId: 'hand-total', text: 'You can read a hand total.' },
        { outcomeId: 'ace-value', text: 'You can use an Ace as 1 or 11.' },
        { outcomeId: 'bust', text: 'You can recognize a bust.' },
      ],
    },
  ],
};

const ROUND_FLOW: Unit = {
  id: 'round-flow',
  title: 'How a Round Works',
  goal: 'Follow the order a blackjack round takes, from the opening deal to settlement.',
  prerequisites: ['goal', 'hand-total'],
  outcomes: ['round-flow', 'dealer-info'],
  requiredChecks: ['dealer-info-check', 'round-order-check'],
  steps: [
    {
      id: 'intro',
      type: 'explain',
      title: 'The shape of a round',
      body:
        'Every round follows the same order: the opening deal, then the player turn, then the ' +
        'dealer turn, then settlement. The dealer deals two cards to the player and two to ' +
        'themselves — but only one dealer card (the upcard) is turned face up. The other ' +
        'stays hidden until the dealer’s turn.',
    },
    {
      id: 'dealer-info-check',
      type: 'question',
      outcomeId: 'dealer-info',
      prompt: 'During the player turn, how much of the dealer’s hand can you see?',
      choices: [
        { value: 'upcard-only', label: 'Only the dealer’s upcard' },
        { value: 'both-cards', label: 'Both of the dealer’s cards' },
      ],
      answer: { kind: 'literal', value: 'upcard-only' },
      correct: 'Right — only the upcard is visible during the player turn.',
      incorrect: 'The other dealer card stays hidden until the dealer’s turn.',
    },
    {
      id: 'round-order-check',
      type: 'question',
      outcomeId: 'round-flow',
      prompt: 'Which order does a round follow?',
      choices: [
        { value: 'deal-player-dealer-settle', label: 'Opening deal → player turn → dealer turn → settlement' },
        { value: 'deal-dealer-player-settle', label: 'Opening deal → dealer turn → player turn → settlement' },
      ],
      answer: { kind: 'literal', value: 'deal-player-dealer-settle' },
      correct: 'Right — the player always acts before the dealer’s turn.',
      incorrect: 'The player acts before the dealer reveals and completes the dealer hand.',
    },
    {
      id: 'recap',
      type: 'recap',
      title: 'How a Round Works — done',
      capabilities: [
        { outcomeId: 'round-flow', text: 'You can follow a blackjack round in order.' },
        { outcomeId: 'dealer-info', text: 'You can read what dealer information is visible.' },
      ],
    },
  ],
};

const HIT_AND_STAND: Unit = {
  id: 'hit-and-stand',
  title: 'Hit and Stand',
  goal: 'Explain and use the two player actions: Hit and Stand.',
  prerequisites: ['round-flow', 'hand-total', 'bust'],
  outcomes: ['hit', 'stand'],
  requiredChecks: ['action-check'],
  steps: [
    {
      id: 'intro',
      type: 'explain',
      title: 'Two actions',
      body:
        'On your turn you can Hit or Stand. Hit takes one more card into your hand. Stand takes ' +
        'no card and ends your turn, passing play along.',
    },
    {
      id: 'action-check',
      type: 'question',
      outcomeId: 'hit',
      prompt: 'Which statement is correct?',
      choices: [
        { value: 'hit-adds-stand-ends', label: 'Hit takes a card; Stand ends the player turn' },
        { value: 'hit-ends-stand-adds', label: 'Hit ends the player turn; Stand takes a card' },
      ],
      answer: { kind: 'literal', value: 'hit-adds-stand-ends' },
      correct: 'Right — Hit takes a card, Stand ends your turn.',
      incorrect: 'Hit changes the hand with another card. Stand keeps it and passes play.',
    },
    {
      id: 'hit-hand',
      type: 'hand',
      outcomeId: 'hit',
      title: 'Try Hit',
      intro: 'This hand is a stiff total. Choose Hit to take one more card.',
      setup: { kind: 'arranged', openings: OPENINGS.stiffHands },
      requestedAction: 'hit',
      teach: 'Hit adds one more card to your hand.',
    },
    {
      id: 'stand-hand',
      type: 'hand',
      outcomeId: 'stand',
      title: 'Try Stand',
      intro: 'Choose Stand to end your turn without taking another card.',
      setup: { kind: 'arranged', openings: OPENINGS.readableTotals },
      requestedAction: 'stand',
      teach: 'Stand ends your turn and passes play along without a new card.',
    },
    {
      id: 'stand-check',
      type: 'question',
      outcomeId: 'stand',
      prompt: 'What happens to your turn when you choose Stand?',
      choices: [
        { value: 'ends-no-card', label: 'It ends, with no new card' },
        { value: 'continues-with-card', label: 'It continues, and you get a new card' },
      ],
      answer: { kind: 'literal', value: 'ends-no-card' },
      correct: 'Right — Stand ends your turn without a new card.',
      incorrect: 'Stand keeps your hand as it is and passes play along.',
    },
    {
      id: 'recap',
      type: 'recap',
      title: 'Hit and Stand — done',
      capabilities: [
        { outcomeId: 'hit', text: 'You can explain and use Hit.' },
        { outcomeId: 'stand', text: 'You can explain and use Stand.' },
      ],
    },
  ],
};

const WIN_LOSE_PUSH: Unit = {
  id: 'win-lose-push',
  title: 'Win, Lose, or Push',
  goal: 'Read a completed hand’s result and follow what happened to the original wager.',
  prerequisites: ['round-flow', 'bust'],
  outcomes: ['outcomes', 'wager-result'],
  requiredChecks: ['outcome-check'],
  steps: [
    {
      id: 'intro',
      type: 'explain',
      title: 'How a hand settles',
      body:
        'When both turns are over, each hand is compared against the dealer’s hand. A hand can ' +
        'win, lose, or push (tie). Your wager stays the same the whole hand unless you double or ' +
        'split — it is simply paid, lost, or returned at settlement.',
    },
    {
      id: 'wlp-hand',
      type: 'hand',
      outcomeId: 'outcomes',
      title: 'Play it out',
      intro: 'Choose Stand to see this hand through to settlement.',
      setup: { kind: 'arranged', openings: OPENINGS.stiffHands },
      requestedAction: 'stand',
      teach: 'The completed hand is compared against the dealer’s hand to settle the result.',
    },
    {
      id: 'outcome-check',
      type: 'question',
      outcomeId: 'outcomes',
      prompt: 'What was the result of that hand?',
      choices: [
        { value: 'win', label: 'Win' },
        { value: 'loss', label: 'Loss' },
        { value: 'push', label: 'Push' },
      ],
      answer: { kind: 'last_outcome', handIndex: 0 },
      correct: 'Right — that is the result the dealer’s hand produced.',
      incorrect: 'Compare the completed hands, including whether either side busted.',
    },
    {
      id: 'wager-check',
      type: 'question',
      outcomeId: 'wager-result',
      prompt: 'You started that hand with a 2,000-cent wager. What was the wager on that hand?',
      choices: [
        { value: '2000', label: '2,000 cents' },
        { value: '1000', label: '1,000 cents' },
      ],
      answer: { kind: 'last_wager', handIndex: 0 },
      correct: 'Right — the wager you started with is the one that settles.',
      incorrect: 'The wager you started the hand with is the one that gets paid or lost.',
    },
    {
      id: 'recap',
      type: 'recap',
      title: 'Win, Lose, or Push — done',
      capabilities: [
        { outcomeId: 'outcomes', text: 'You can recognize a win, loss, or push.' },
        { outcomeId: 'wager-result', text: 'You can follow what happens to the original wager.' },
      ],
    },
  ],
};

const BLACKJACK_IS_SPECIAL: Unit = {
  id: 'blackjack-is-special',
  title: 'Blackjack Is Special',
  goal: 'Distinguish a natural blackjack from an ordinary 21 and learn its payout.',
  prerequisites: ['hand-total', 'outcomes', 'wager-result'],
  outcomes: ['natural-blackjack'],
  requiredChecks: ['natural-check', 'payout-check'],
  steps: [
    {
      id: 'intro',
      type: 'explain',
      title: 'A natural blackjack',
      body:
        'An Ace plus a ten-value card on your first two cards is a natural blackjack — not just ' +
        'any hand that totals 21. A natural blackjack pays 3:2, better than an ordinary win.',
      cards: [{ rank: 'ace', suit: 'spades' }, { rank: 'king', suit: 'hearts' }],
    },
    {
      id: 'bjs-hand',
      type: 'hand',
      outcomeId: 'natural-blackjack',
      title: 'Watch a natural resolve',
      intro: 'Watch the opening deal — this hand settles immediately.',
      setup: { kind: 'arranged', openings: OPENINGS.naturals },
      teach: 'An Ace and a ten-value card on the first two cards resolve immediately as a natural blackjack.',
    },
    {
      id: 'natural-check',
      type: 'question',
      outcomeId: 'natural-blackjack',
      prompt:
        'Which hand is a natural blackjack: the two-card Ace + King you just saw, or a later ' +
        'three-card 8 + 8 + 5 that also totals 21?',
      choices: [
        { value: 'two-card', label: 'The two-card Ace + King' },
        { value: 'three-card', label: 'The three-card 8 + 8 + 5' },
      ],
      answer: { kind: 'literal', value: 'two-card' },
      correct: 'Right — an Ace and a ten-value card on the first two cards is a natural blackjack.',
      incorrect: 'A later three-card 21 is 21, but it is not a natural blackjack.',
    },
    {
      id: 'payout-check',
      type: 'question',
      outcomeId: 'natural-blackjack',
      prompt: 'That natural was a 2,000-cent wager. What was the bankroll change from that hand?',
      choices: [
        { value: '2000', label: '+2,000 cents (even money)' },
        { value: '3000', label: '+3,000 cents (3:2)' },
      ],
      answer: { kind: 'last_bankroll_delta' },
      correct: 'Right — blackjack pays 3:2.',
      incorrect: 'Blackjack pays 3:2 under the active V1 ruleset.',
    },
    {
      id: 'recap',
      type: 'recap',
      title: 'Blackjack Is Special — done',
      capabilities: [
        { outcomeId: 'natural-blackjack', text: 'You can distinguish blackjack from ordinary 21.' },
      ],
    },
  ],
};

export const BLACKJACK_BASICS: Subject = {
  id: 'blackjack-basics',
  title: 'Blackjack Basics',
  skills: SKILLS,
  units: [
    MEET_BLACKJACK,
    READ_YOUR_HAND,
    ROUND_FLOW,
    HIT_AND_STAND,
    WIN_LOSE_PUSH,
    BLACKJACK_IS_SPECIAL,
  ],
};
