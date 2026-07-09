#!/usr/bin/env bash
set -euo pipefail
# Guard dev/build/test from silently running a stale engine (QA-001, run 2026-07-09-v1-milestone):
# the wasm artifact is gitignored, so nothing else ties it to the Rust core sources.
# npm runs this from web/; paths below are repo-root-relative, so cd there first (same as build-wasm.sh).
cd "$(dirname "$0")/../.."
WASM=web/src/bridge/wasm/blackjack_core_bg.wasm
if [[ ! -f "$WASM" ]]; then
  echo "wasm artifact missing: $WASM — run 'npm run build:wasm' (from web/)" >&2
  exit 1
fi
NEWER=$(find crates/blackjack-core/src crates/blackjack-core/Cargo.toml -type f -newer "$WASM" -print -quit)
if [[ -n "$NEWER" ]]; then
  echo "stale wasm: $NEWER is newer than $WASM — run 'npm run build:wasm' (from web/)" >&2
  exit 1
fi
