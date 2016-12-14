#!/usr/bin/env node

const exec = require('child_process').exec;

const args = process.argv.slice(2);

console.log(process.cwd());
console.log(__dirname);

const ls = exec(`rimraf phantomcss/failures && rimraf phantomcss/results && casperjs test ${__dirname}/../src/test.js ${args.join(' ')}`);

ls.stdout.on('data', console.log);
ls.stderr.on('data', console.error);
