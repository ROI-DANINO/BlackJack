#!/usr/bin/env python3
"""Interactive text wizard for manually playing blackjack-core over its JSON CLI boundary.

Talks to the same CoreCommand/CoreResponse JSON protocol the future UI will use --
this script only formats/hides things for display, the engine holds all real state.
"""
import json
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
BINARY = REPO_ROOT / "target" / "debug" / "blackjack-core"

RANK_VALUE = {
    "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7,
    "eight": 8, "nine": 9, "ten": 10, "jack": 10, "queen": 10, "king": 10,
    "ace": 11,
}
SUIT_GLYPH = {"spades": "S", "hearts": "H", "diamonds": "D", "clubs": "C"}

ACTION_KEYS = {"h": "hit", "s": "stand", "d": "double", "sp": "split"}


def call(command: dict) -> dict:
    proc = subprocess.run(
        [str(BINARY)],
        input=json.dumps(command),
        capture_output=True,
        text=True,
        check=True,
    )
    result = json.loads(proc.stdout)
    if result["status"] == "error":
        raise RuntimeError(result["message"])
    return result["response"]["data"]


RANK_LABEL = {
    "two": "2", "three": "3", "four": "4", "five": "5", "six": "6",
    "seven": "7", "eight": "8", "nine": "9", "ten": "10",
    "jack": "J", "queen": "Q", "king": "K", "ace": "A",
}


def card_str(card: dict) -> str:
    return f"{RANK_LABEL[card['rank']]}{SUIT_GLYPH[card['suit']]}"


def hand_value(cards: list) -> tuple[int, bool]:
    total = sum(RANK_VALUE[c["rank"]] for c in cards)
    aces = sum(1 for c in cards if c["rank"] == "ace")
    soft = False
    while total > 21 and aces > 0:
        total -= 10
        aces -= 1
    if aces > 0 and total <= 21:
        soft = True
    return total, soft


def describe_hand(cards: list) -> str:
    total, soft = hand_value(cards)
    tag = "soft" if soft else "hard"
    cards_str = " ".join(card_str(c) for c in cards)
    return f"{cards_str}  ({tag} {total})"


def print_table(round_state: dict, hide_hole_card: bool):
    dealer_cards = round_state["dealer"]["cards"]
    if hide_hole_card and len(dealer_cards) > 1:
        shown = [card_str(dealer_cards[0])] + ["??"] * (len(dealer_cards) - 1)
        print(f"Dealer: {' '.join(shown)}")
    else:
        print(f"Dealer: {describe_hand(dealer_cards)}")

    for i, hand in enumerate(round_state["hands"]):
        marker = " <-- active" if i == round_state["active_hand_index"] and round_state["status"] == "player_turn" else ""
        print(f"Hand {i} (bet {hand['wager']}): {describe_hand(hand['cards'])}{marker}")


def play_round(session: dict) -> dict:
    session = call({"command": "start_round", "session": session, "bet": None})
    round_state = session["round"]

    while round_state["status"] == "player_turn":
        print()
        print_table(round_state, hide_hole_card=True)

        legal = call({"command": "legal_actions", "session": session})
        options = [a for a in legal]
        prompt_bits = []
        for opt in options:
            key = next(k for k, v in ACTION_KEYS.items() if v == opt)
            prompt_bits.append(f"{key}={opt}")
        choice = input(f"Action [{', '.join(prompt_bits)}]: ").strip().lower()

        action = ACTION_KEYS.get(choice, choice if choice in legal else None)
        if action not in legal:
            print(f"  not legal right now, try one of: {legal}")
            continue

        session = call({
            "command": "apply_action",
            "session": session,
            "action": action,
        })
        round_state = session["round"]

    print()
    print("--- round resolved ---")
    print_table(round_state, hide_hole_card=False)
    for outcome in session["logs"][-1]["outcomes"]:
        print(f"  hand {outcome['hand_index']}: {outcome['result']} (delta {outcome['delta']:+d})")
    print(f"Bankroll: {session['bankroll']}")
    return session


def main():
    if not BINARY.exists():
        print(f"binary not found at {BINARY} -- run `cargo build` first", file=sys.stderr)
        sys.exit(1)

    print("=== blackjack-core manual play wizard ===")
    seed = input("Seed [blank = 'manual-play']: ").strip() or "manual-play"
    bankroll = int(input("Starting bankroll [1000]: ").strip() or "1000")
    bet = int(input("Default bet [20]: ").strip() or "20")

    session = call({
        "command": "start_session",
        "seed": seed,
        "bankroll": bankroll,
        "default_bet": bet,
        "ruleset": None,
    })
    print(f"Ruleset: {session['ruleset']['id']}")

    while True:
        try:
            session = play_round(session)
        except RuntimeError as exc:
            if "penetration" in str(exc).lower() or "reshuffle" in str(exc).lower():
                print(f"  ({exc}) -- reshuffling")
                session = call({"command": "reshuffle", "session": session})
                continue
            raise

        again = input("\n(enter) next round, r=reshuffle, q=quit: ").strip().lower()
        if again == "q":
            break
        if again == "r":
            session = call({"command": "reshuffle", "session": session})
            print("Shoe reshuffled.")


if __name__ == "__main__":
    try:
        main()
    except (EOFError, KeyboardInterrupt):
        print("\nbye")
