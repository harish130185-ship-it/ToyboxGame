#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const WWW = path.join(ROOT, 'www');

const ITEMS_TO_COPY = [
  'index.html',
  'manifest.webmanifest',
  'sw.js',
  'calm-corner',
  'emoji-paint',
  'exquisite-corpse',
  'grocery-cashier',
  'guess-next-sequence',
  'memory',
  'odd-one-out',
  'shape-fit',
  'sudoku-for-minis',
  'through-the-woods'
];

if (fs.existsSync(WWW)) {
  fs.rmSync(WWW, { recursive: true, force: true });
}
fs.mkdirSync(WWW, { recursive: true });

for (const item of ITEMS_TO_COPY) {
  const src = path.join(ROOT, item);
  const dest = path.join(WWW, item);
  if (fs.existsSync(src)) {
    fs.cpSync(src, dest, { recursive: true });
    console.log(`Copied ${item} to www/`);
  } else {
    console.warn(`Warning: ${item} not found.`);
  }
}

console.log('Build www completed successfully.');
