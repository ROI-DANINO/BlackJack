import type { LogLine, LogSink } from './sink';

/** In-memory JSONL accumulation + .jsonl download. First store implementation. */
export class MemorySink implements LogSink {
  private lines: string[] = [];

  async write(line: LogLine): Promise<void> {
    this.lines.push(JSON.stringify(line));
  }

  async flush(): Promise<void> {}

  export(): Blob {
    const body = this.lines.length ? this.lines.join('\n') + '\n' : '';
    return new Blob([body], { type: 'application/x-ndjson' });
  }

  /** Test-only accessor. */
  text(): string {
    return this.lines.join('\n');
  }
}
