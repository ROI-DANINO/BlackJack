# Triage Labels

The skills speak in terms of five canonical triage roles. This file maps those roles to the actual label strings used in this repo's issue tracker.

| Label in mattpocock/skills | Label in our tracker | Meaning                                  |
| -------------------------- | -------------------- | ---------------------------------------- |
| `needs-triage`             | `needs-triage`       | Maintainer needs to evaluate this issue  |
| `needs-info`               | `needs-info`         | Waiting on reporter for more information |
| `ready-for-agent`          | `ready-for-agent`    | Fully specified, ready for an AFK agent  |
| `ready-for-human`          | `ready-for-human`    | Requires human implementation            |
| `wontfix`                  | `wontfix`            | Will not be actioned                     |

When a skill mentions a role (e.g. "apply the AFK-ready triage label"), use the corresponding label string from this table.

Edit the right-hand column to match whatever vocabulary you actually use.

## State on the repo when this was scaffolded (2026-08-01)

Checked positively with `gh label list`, rather than assumed:

- **`wontfix` already exists** on `ROI-DANINO/BlackJack` (a GitHub default, white `#ffffff`). `/triage`
  will apply the existing label rather than create a duplicate.
- **The other four do not exist yet** — `needs-triage`, `needs-info`, `ready-for-agent`,
  `ready-for-human` are created on first use.
- The repo's eight other labels are stock GitHub defaults (`bug`, `documentation`, `duplicate`,
  `enhancement`, `good first issue`, `help wanted`, `invalid`, `question`). **None collides** with a
  canonical role, so no override mapping was needed.
