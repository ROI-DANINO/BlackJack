import type { Card } from '../bridge/types';

const RANK: Record<string, string> = {
  ace: 'A', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7',
  eight: '8', nine: '9', ten: '10', jack: 'J', queen: 'Q', king: 'K',
};
const SUIT: Record<string, string> = { clubs: '♣', diamonds: '♦', hearts: '♥', spades: '♠' };

export function HandView({ label, cards, hideFrom }: { label: string; cards: Card[]; hideFrom?: number }) {
  return (
    <div>
      <strong>{label}:</strong>{' '}
      {cards.map((c, i) =>
        hideFrom !== undefined && i >= hideFrom
          ? <span key={c.card_id}>[??] </span>
          : <span key={c.card_id}>{RANK[c.rank]}{SUIT[c.suit]} </span>,
      )}
    </div>
  );
}
