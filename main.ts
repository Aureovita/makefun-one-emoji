// "One Emoji, One Smile" — the entire entry is a single emoji.
//
// The pick is the melting face: it is the rare emoji that reads as a smile
// and a whole mood at once. Everyone has been that puddle of a person —
// grinning through the heat, the deadline, the group chat — so a stranger
// tends to recognise themselves in it and smile back. No words, no caption:
// one symbol, doing all the work on its own.
//
// Running this program writes that emoji, and nothing else, to entry.txt
// inside the output directory.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ENTRY = '🫠';

function checkEntry(symbol: string): void {
  if (symbol.length === 0) {
    throw new Error('the entry is empty; exactly one emoji is required');
  }
  if (/\s/.test(symbol)) {
    throw new Error('the entry must be a single emoji, with no whitespace');
  }
  if (/[\p{L}\p{N}]/u.test(symbol)) {
    throw new Error('the entry must be a symbol only: no letters, no digits');
  }
}

function targetDirectory(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  return fromEnv !== undefined && fromEnv !== '' ? fromEnv : '/output';
}

function main(): void {
  checkEntry(ENTRY);
  const dir = targetDirectory();
  mkdirSync(dir, { recursive: true });
  const file = join(dir, 'entry.txt');
  writeFileSync(file, ENTRY + '\n', 'utf8');
  console.log(`entry written to ${file}: ${ENTRY}`);
}

main();
