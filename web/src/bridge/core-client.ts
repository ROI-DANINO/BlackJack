import type { CoreTransport } from './transport';
import { handleCommand } from './wasm/blackjack_core';

/** Browser transport: calls the WASM export synchronously (after init in main.tsx). */
export class WasmTransport implements CoreTransport {
  call(commandJson: string): string {
    return handleCommand(commandJson);
  }
}
