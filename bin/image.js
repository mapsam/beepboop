#!/usr/bin/env node

/**
 * Convert image
 */

const fs = require('fs');
const imageType = require('image-type');
const path = process.argv[2];

const img = fs.readFileSync(path);
const bin = img.toString('base64');

console.log(JSON.stringify({
  data: bin,
  type: imageType(img)
}));