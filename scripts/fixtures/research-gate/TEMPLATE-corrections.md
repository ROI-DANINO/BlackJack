# Corrections — Unit U1

| ID | Correction | State |
|----|------------|-------|
| C1 | overstated effect size in claim 2 | LANDED |
| C2 | col A\|B mislabeled in the summary table | LANDED |
| C3 | fabricated citation replaced with the real source | NOT-LANDED |
| C3 | fabricated citation replaced with the real source | LANDED |

Notes for authors — prose like this section is permitted, but the gate FAILS any line
outside the table above that carries correction state or a terminal keyword:

- The table must be one contiguous block: header row, separator row, then rows, ending
  at the first blank line. Only the FIRST such block is the ledger.
- Row grammar: `| C<n> | description | <state> |` where state is the landed word or its
  `NOT-` prefixed form, exactly as in the rows above. `\|` escapes a literal pipe inside
  the description cell.
- Retry (see C3 above): append a new row with the SAME ID and the IDENTICAL description;
  the last row for an ID wins. A different description requires a new ID.
- The gate passes only when every ID's last row reaches the landed state and
  `landing-confirmation.md` contains exactly `CONFIRMED` and nothing else.
- Checked by `scripts/research-gate.ts`.
