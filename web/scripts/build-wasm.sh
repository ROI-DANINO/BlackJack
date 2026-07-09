#!/usr/bin/env bash
set -euo pipefail
# npm runs this from web/; all paths below are repo-root-relative, so cd there first.
cd "$(dirname "$0")/../.."
# Pin wasm-bindgen-cli to the crate version; (re)install on absence OR mismatch.
WB_VERSION="0.2.126"
if ! command -v wasm-bindgen >/dev/null 2>&1 || [ "$(wasm-bindgen --version | awk '{print $2}')" != "$WB_VERSION" ]; then
  cargo install wasm-bindgen-cli --version "$WB_VERSION" --force
fi
cargo build -p blackjack-core --features wasm --release --target wasm32-unknown-unknown
wasm-bindgen \
  target/wasm32-unknown-unknown/release/blackjack_core.wasm \
  --out-dir web/src/bridge/wasm --target web
echo "wasm build complete -> web/src/bridge/wasm/"
