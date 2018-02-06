const fs    = require('fs');
const http  = require('http');
const https = require('https');
const url   = require('url');

// check if file name was provided as command line parameter
if (process.argv.length < 3) {
  console.error('Usage: node test.js <filename>');
  return;
}
// set file name
const csvFile = process.argv.slice(2)[0];

// read lines from file in array (change new line chars if needed)
const lines = fs.readFileSync(csvFile, 'utf8').split('\r\n').filter(Boolean);

// loop through lines
lines.forEach(line => {
  // valid lines have to start with 'http'
  if (!line.startsWith('http')) {
    console.error(line, 'is no valid url');
    return;
  }

  let urls = line.split(',');
  let fromUrl = url.parse(urls[0]);
  let toUrl   = url.parse(urls[1]);
  let options;
  let client;

  if (fromUrl.protocol === 'http:') {
    options = {method: 'HEAD', host: fromUrl.hostname, port: 80, path: fromUrl.path};
    client  = http;
  } else if (fromUrl.protocol === 'https:') {
    options = {method: 'HEAD', host: fromUrl.hostname, port: 443, path: fromUrl.path};
    client  = https;
  } else {
    console.log('ERROR:', fromUrl.href,'\n  protocol has to be http: or https:, got', fromUrl.protocol);
    return;
  }

  let req = client.request(options, res => {
    if (res.statusCode === 301) {
      if(res.headers.location === toUrl.href) {
        console.log('SUCCESS:', fromUrl.href);
      } else {
        console.log('FAIL: Line', lines.indexOf(line) + 1 , fromUrl.href, '\n  EXPECTED:', toUrl.href, '\n  GOT:     ', res.headers.location);
      }
    } else {
      console.log('FAIL: Line',  lines.indexOf(line) + 1, fromUrl.href, 'has response code', res.statusCode);
    }
  }).on('error', (e) => {
    console.log('ERROR:', fromUrl.href, e.message);
  });
  req.end();
});
