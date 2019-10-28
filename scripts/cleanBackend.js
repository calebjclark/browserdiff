#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const cleanBackend = require('../lib/cleanBackend');

const filenames = process.argv.slice(2);
const files = {};

////////////////////////////////////////////////////////////////////////////////////////////////////

if (!filenames.length) console.log(`You must pass in files to clean`), process.exit();

////////////////////////////////////////////////////////////////////////////////////////////////////

for (let filename of filenames) {
  filepath = path.resolve(process.cwd(), filename);
  if (!exists(filepath)) console.log(`File could not be found: ${filepath}`), process.exit();
  if (!isFile(filepath)) console.log(`File must not be a directory: ${filepath}`), process.exit();

  const raw = fs.readFileSync(filepath, 'utf8');
  const data = JSON.parse(raw);
  const cleaned = cleanBackend(data);

  fs.writeFileSync(filepath, JSON.stringify(cleaned, null, 2));

  console.log(`CLEANED ${filepath}`);
}

////////////////////////////////////////////////////////////////////////////////////////////////////

function exists(filepath) {
  return fs.existsSync(filepath);
}

function isFile(filepath) {
  return !fs.statSync(filepath).isDirectory();
}
