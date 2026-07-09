import type { CliOutput, CoreResponse } from './types';

/** Recoverable: the core rejected a command (e.g. illegal action). Play continues. */
export class CoreRuleError extends Error {}
/** Fatal: malformed/absent envelope or transport failure. The instance may be poisoned. */
export class BridgeError extends Error {}

/** Validate the discriminants of a raw core reply and narrow it to CliOutput. */
export function parseCliOutput(raw: string): CliOutput {
  let v: unknown;
  try {
    v = JSON.parse(raw);
  } catch {
    throw new BridgeError(`core returned non-JSON: ${raw.slice(0, 120)}`);
  }
  if (!v || typeof v !== 'object' || !('status' in v)) throw new BridgeError('envelope missing status');
  const o = v as Record<string, unknown>;
  if (o.status === 'error') {
    if (typeof o.message !== 'string') throw new BridgeError('error envelope missing message');
    return { status: 'error', message: o.message };
  }
  if (o.status === 'ok') {
    const r = o.response as Record<string, unknown> | undefined;
    if (!r || (r.type !== 'session' && r.type !== 'actions') || !('data' in r)) {
      throw new BridgeError('ok envelope has malformed response');
    }
    return { status: 'ok', response: r as unknown as CoreResponse };
  }
  throw new BridgeError(`unknown envelope status: ${String(o.status)}`);
}
