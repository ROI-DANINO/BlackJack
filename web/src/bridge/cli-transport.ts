import { spawnSync } from 'node:child_process';
import type { CoreTransport } from './transport';

/** Node-only transport that shells the native core binary. Test/QA use, never bundled. */
export class CliTransport implements CoreTransport {
  constructor(private readonly bin: string) {}
  call(commandJson: string): string {
    const r = spawnSync(this.bin, { input: commandJson, encoding: 'utf8' });
    if (r.status !== 0) throw new Error(`core exited ${r.status}: ${r.stderr}`);
    return r.stdout.trim();
  }
}
