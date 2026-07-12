// Pure, serializable opening prefixes for arranged hand steps. Each opening is an
// ORDER for the top of a real, shuffled, composition-correct six-deck shoe:
// [player-first, dealer-up, player-second]. The dealer's hole card and every later card
// still come from the honest shuffled remainder (see crates/blackjack-core/src/shoe.rs).
//
// This is DATA ONLY — unlike the retired drill's `situation.build(seq)`, there are no
// functions here, so `JSON.parse(JSON.stringify(OPENINGS))` deep-equals OPENINGS and the
// controller can pick deterministically with `openings[seq() % openings.length]`.

import type { PresetCard } from '../bridge/types';

const C = (rank: PresetCard['rank'], suit: PresetCard['suit']): PresetCard => ({ rank, suit });

// Dealer upcards that can never make the dealer a natural (never ten-value or ace), so an
// arranged opening resolves around the player's decision rather than a surprise dealer BJ.
const UP_SIX = C('six', 'diamonds');
const UP_FIVE = C('five', 'clubs');
const UP_FOUR = C('four', 'hearts');
const UP_SEVEN = C('seven', 'spades');

/** Named opening groups keyed by the teaching total they set up. Each group is a list of
 *  interchangeable variants so a lesson can rotate them across repetitions. */
export const OPENINGS = {
  // Plain readable two-card totals (no double/split temptation) — for reading the hand.
  readableTotals: [
    [C('ten', 'spades'), UP_SIX, C('two', 'hearts')],   // 12
    [C('nine', 'clubs'), UP_FIVE, C('three', 'diamonds')], // 12
    [C('seven', 'spades'), UP_FOUR, C('six', 'hearts')], // 13
  ],
  // Stiff hands (12-16): the hardest hit/stand decisions.
  stiffHands: [
    [C('ten', 'spades'), UP_SIX, C('six', 'hearts')],   // 16
    [C('king', 'clubs'), UP_FIVE, C('five', 'spades')], // 15
    [C('nine', 'hearts'), UP_FOUR, C('seven', 'diamonds')], // 16
  ],
  // Naturals: Ace + ten-value. Resolves on the deal — no decision.
  naturals: [
    [C('ace', 'spades'), UP_SIX, C('king', 'hearts')],
    [C('ace', 'clubs'), UP_FIVE, C('queen', 'clubs')],
    [C('ace', 'hearts'), UP_FOUR, C('ten', 'diamonds')],
  ],
  // Elevens: the strongest doubling total.
  elevens: [
    [C('six', 'spades'), UP_SEVEN, C('five', 'hearts')],  // 11
    [C('seven', 'spades'), UP_FIVE, C('four', 'diamonds')], // 11
    [C('eight', 'clubs'), UP_FOUR, C('three', 'hearts')], // 11
  ],
  // Pairs: splittable openings.
  pairs: [
    [C('eight', 'spades'), UP_SIX, C('eight', 'hearts')],
    [C('nine', 'spades'), UP_FIVE, C('nine', 'diamonds')],
    [C('seven', 'clubs'), UP_FOUR, C('seven', 'hearts')],
  ],
} satisfies Record<string, PresetCard[][]>;
