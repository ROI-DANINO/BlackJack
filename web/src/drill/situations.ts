import type { PresetCard } from '../bridge/types';
import type { SituationBuilder } from './unit';

const C = (rank: PresetCard['rank'], suit: PresetCard['suit']): PresetCard => ({ rank, suit });
// Dealer upcards that never make the dealer a natural (keeps setups clean); rotated by seq.
const DEALER_UPS: PresetCard[] = [C('six', 'diamonds'), C('five', 'clubs'), C('four', 'hearts'), C('seven', 'spades')];
const pick = <T,>(arr: T[], seq: number): T => arr[((seq % arr.length) + arr.length) % arr.length]!;

/** [player1, dealerUp, player2] — a splittable pair. */
export const pairOpening: SituationBuilder = (seq) => {
  const pairs: [PresetCard, PresetCard][] = [
    [C('eight', 'spades'), C('eight', 'hearts')],
    [C('nine', 'spades'), C('nine', 'diamonds')],
    [C('seven', 'clubs'), C('seven', 'hearts')],
  ];
  const [a, b] = pick(pairs, seq);
  return [a, pick(DEALER_UPS, seq), b];
};

/** [player1, dealerUp, player2] — totals eleven. */
export const elevenOpening: SituationBuilder = (seq) => {
  const combos: [PresetCard, PresetCard][] = [
    [C('six', 'spades'), C('five', 'hearts')],
    [C('seven', 'spades'), C('four', 'diamonds')],
    [C('eight', 'clubs'), C('three', 'hearts')],
  ];
  const [a, b] = pick(combos, seq);
  return [a, pick(DEALER_UPS, seq), b];
};

/** [player1, dealerUp, player2] — Ace + ten-value (a natural). */
export const naturalBlackjackOpening: SituationBuilder = (seq) => {
  const tens: PresetCard[] = [C('king', 'hearts'), C('queen', 'clubs'), C('ten', 'diamonds')];
  const aces: PresetCard[] = [C('ace', 'spades'), C('ace', 'clubs'), C('ace', 'hearts')];
  return [pick(aces, seq), pick(DEALER_UPS, seq), pick(tens, seq)];
};

/** [player1, dealerUp, player2] — a stiff sixteen. */
export const stiffSixteenOpening: SituationBuilder = (seq) => {
  const combos: [PresetCard, PresetCard][] = [
    [C('ten', 'spades'), C('six', 'hearts')],
    [C('king', 'clubs'), C('six', 'spades')],
    [C('nine', 'hearts'), C('seven', 'diamonds')],
  ];
  const [a, b] = pick(combos, seq);
  return [a, pick(DEALER_UPS, seq), b];
};

/** [player1, dealerUp, player2] — a plain readable total in the low teens. */
export const readableTotalOpening: SituationBuilder = (seq) => {
  const combos: [PresetCard, PresetCard][] = [
    [C('ten', 'spades'), C('two', 'hearts')],
    [C('nine', 'clubs'), C('three', 'diamonds')],
    [C('seven', 'spades'), C('five', 'hearts')],
  ];
  const [a, b] = pick(combos, seq);
  return [a, pick(DEALER_UPS, seq), b];
};
