#!/usr/bin/env node

const exec = require('child_process').exec;
const httpServer = require('http-server');
const yargs = require('yargs');

const DEFAULT_PORT = 3010;

const args = process.argv.slice(2);

const serveDir = yargs.argv.serveDir;

console.log(process.cwd());
console.log(__dirname);

let server,
  serverClose = () => {}; // noop by default
if (serveDir) {
  server = httpServer.createServer({ root: serveDir });
  serverClose = () => { server.close(); };
  server.listen(yargs.argv.port || DEFAULT_PORT);
}

const ls = exec(
  `rimraf phantomcss/failures && rimraf phantomcss/results && casperjs test ${__dirname}/../src/test.js ${args.join(' ')}`,
  (err, stdout, stderr) => { serverClose(); }
);

ls.stdout.on('data', console.log);
ls.stderr.on('data', console.error);
