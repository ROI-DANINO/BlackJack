import type { DrillUnit } from './unit';
import { elevenOpening, naturalBlackjackOpening, pairOpening, readableTotalOpening, stiffSixteenOpening } from './situations';

const LIVE = { minHands: 5, maxHands: 10 } as const;

export const UNITS: DrillUnit[] = [
  {
    id: 'reading-the-table',
    title: 'Reading the table',
    goal: 'Read a hand total, and know what a natural blackjack is.',
    situations: [
      {
        id: 'read-total', topic: 'Hand totals',
        intro: 'Your total is the sum of your cards; an Ace counts as 11 unless that would bust. Read your hand, then stand to keep it.',
        build: readableTotalOpening,
        teach: 'That is your total. Higher is generally stronger, but the dealer still has to play.',
      },
      {
        id: 'natural-blackjack', topic: 'Blackjack',
        intro: 'An Ace with a ten-value card on your first two cards is a natural blackjack — an instant 21 that pays 3:2.',
        build: naturalBlackjackOpening,
        teach: 'A natural blackjack settles at once and pays 3:2. Reaching 21 later with more cards is still just 21, not a blackjack.',
      },
    ],
    live: { intro: "Now let's play a real shoe. Read each total; I'll name blackjacks as they come. Play 5–10 hands, or press “Got it” anytime.", ...LIVE },
  },
  {
    id: 'hit-stand-stakes',
    title: 'Hit, Stand, and the stakes',
    goal: 'Know what Hit and Stand do, and how win, loss, and push are decided.',
    situations: [
      {
        id: 'hit-or-stand', topic: 'Hit and Stand',
        intro: 'Hit takes another card; Stand keeps your total and passes to the dealer. You have a stiff 16 — try Hit and feel the bust risk.',
        build: stiffSixteenOpening, hint: 'hit',
        teach: 'Hitting can improve a hand or bust it (over 21 loses at once). Standing hands the turn to the dealer, who then plays by fixed rules.',
      },
    ],
    live: { intro: "Now let's play a real shoe. Hit or Stand as you like; I'll name each result — win, loss, or push — and how the dealer's hand decided it. 5–10 hands, or “Got it” anytime.", ...LIVE },
  },
  {
    id: 'double-split',
    title: 'Double and Split',
    goal: 'Know what Double and Split do to your bet and your hands.',
    situations: [
      {
        id: 'double', topic: 'Double',
        intro: 'Double doubles your bet and takes exactly one more card, then stands. You have 11 — a classic spot to try it.',
        build: elevenOpening, hint: 'double',
        teach: 'Doubling raises both the reward and the risk: a bigger bet, but only one more card.',
      },
      {
        id: 'split', topic: 'Split',
        intro: 'A pair can be split into two separate hands, each with its own bet, played and settled on its own. You have a pair — try splitting it.',
        build: pairOpening, hint: 'split',
        teach: 'Splitting makes two independent hands. Each is settled separately and each carries its own bet.',
      },
    ],
    live: { intro: "Now let's play a real shoe. Double or Split when they're offered; I'll name each hand's result. 5–10 hands, or “Got it” anytime.", ...LIVE },
  },
];

export const FIRST_SUBJECT = { id: 'get-to-know-blackjack', title: 'Get to Know Blackjack', units: UNITS };
