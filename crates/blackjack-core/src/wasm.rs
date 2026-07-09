use crate::dispatch_json;
use wasm_bindgen::prelude::*;

/// Browser entry point: one JSON command in, one `{status,...}` envelope JSON out.
/// Mirrors the CLI exactly (same `dispatch_json`), so determinism and shapes match.
#[wasm_bindgen(js_name = handleCommand)]
pub fn wasm_handle_command(input: &str) -> String {
    console_error_panic_hook::set_once();
    dispatch_json(input)
}
