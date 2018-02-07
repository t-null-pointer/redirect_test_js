const fs = require('fs');
const http = require('http');
const https = require('https');
const url = require('url');

// TODO:
// add output options: cli (command line/ console output) -> basic output
// txt/ csv -> more extensive output
// xml / json
// html
// write reporter.js for that and call the methods from there?
// write tests for this???


// check if file name was provided as command line parameter
if (process.argv.length < 3) {
  console.error('>>> USAGE: node test.js [filename]');
  return;
}

// chech if file has supported extension
if (!process.argv.slice(2)[0].endsWith(".txt") && !process.argv.slice(2)[0].endsWith(".csv")) {
  console.error('>>> SUPPORTED file extensions: .csv or .txt');
  return;
}

// set file name
const inputFile = process.argv.slice(2)[0];

// check if http status code was given, if not set default (301)
if (process.argv.length < 4) {
  var httpCode = 301;
} else {
  httpCode = parseInt(process.argv.slice(2)[1]);
}

// read lines from file in array (change new line chars if needed)
const lines = fs.readFileSync(inputFile, 'utf8').split('\r\n').filter(Boolean);

// loop through lines
lines.forEach(line => {
  // valid lines have to start with 'http'
  if (!line.startsWith('http')) {
    console.error(line, '>>> is no valid url');
    return;
  }

  let urls = line.split(',');
  let fromUrl = url.parse(urls[0]);
  let toUrl = url.parse(urls[1]);
  let options;
  let client;

  if (fromUrl.protocol === 'http:') {
    options = {
      method: 'HEAD',
      host: fromUrl.hostname,
      port: 80,
      path: fromUrl.path
    };
    client = http;
  } else if (fromUrl.protocol === 'https:') {
    options = {
      method: 'HEAD',
      host: fromUrl.hostname,
      port: 443,
      path: fromUrl.path
    };
    client = https;
  } else {
    console.log('ERROR: Line', lines.indexOf(line) + 1, fromUrl.href, '\n  protocol has to be http: or https:, got', fromUrl.protocol);
    return;
  }

  let req = client.request(options, res => {
    if (res.statusCode === httpCode) {
      if (res.headers.location === toUrl.href) {
        console.log('SUCCESS:', fromUrl.href);
      } else {
        console.log('FAIL: Line', lines.indexOf(line) + 1, fromUrl.href, '\n  EXPECTED:', toUrl.href, '\n  GOT:     ', res.headers.location);
      }
    } else {
      console.log('FAIL: Line', lines.indexOf(line) + 1, fromUrl.href, 'has response code', res.statusCode);
    }
  }).on('error', (e) => {
    console.log('ERROR: Line',lines.indexOf(line) + 1, fromUrl.href, e.message);
  });
  req.end();
});
