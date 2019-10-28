const http = require('http');
const Url = require('url');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const { cleanFrontendObj, cleanBackendObj, cleanFrontendJson, cleanBackendJson } = require('./lib/clean');
const port = 8125;
const baseDir = path.resolve(__dirname, './dumps');

if (!fs.existsSync(baseDir)){
  fs.mkdirSync(baseDir);
}

http.createServer(function (req, res) {
  console.log(`${req.method} ${req.url}`);

  const url = Url.parse(req.url);

  if (req.method === 'POST' && url.pathname === '/frontend') {
    const chunks = [];
    req.on('data', (chunk) => {
      chunks.push(chunk);
    }).on('end', () => {
      const filename = url.query;
      const body = JSON.parse(Buffer.concat(chunks).toString());
      if (filename) {
        const frontend = cleanFrontendObj(body);
        const backend = cleanBackendObj(decircularize(req));

        const frontendJson = cleanFrontendJson(JSON.stringify(frontend, null, 2))
        const backendJson = cleanBackendJson(JSON.stringify(backend, null, 2))

        fs.writeFileSync(`${baseDir}/frontend-${filename}.json`, frontendJson);
        fs.writeFileSync(`${baseDir}/backend-${filename}.json`, backendJson);
      }
      res.statusCode = 201;
      res.setHeader('Content-type', 'application/json' );
      res.end(`{"received": true}`);
    });
    return;
  }

  const filename = completeFilename(`./src${url.pathname}`);
  const ext = path.parse(filename).ext;
  const map = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword'
  };

  const fileExists = fs.existsSync(filename);
  if(!fileExists) {
    // if the file is not found, return 404
    res.statusCode = 404;
    res.end(`File ${filename} not found!`);
    return;
  }

  // read file from file system
  fs.readFile(filename, function(err, data){
    if(err){
      res.statusCode = 500;
      res.end(`Error getting the file: ${err}.`);
    } else {
      // if the file is found, set Content-type and send data
      res.setHeader('Content-type', map[ext] || 'text/plain' );
      res.end(data);
    }
  });
}).listen(parseInt(port));

console.log(`Server listening on port ${port}`);

////////////////////////////////////////////////////////////////////////////////////////////////////

function decircularize(obj) {
  const cache = new Map();
  obj = JSON.stringify(obj, function(key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.get(value) === undefined) {
        cache.set(value, key);
      } else {
        value = `CIRCULAR VALUE TO: ${cache.get(value)}`;
      }
    }
    return value;
  });
  return JSON.parse(obj);
}

function completeFilename(filename) {
  try {
    return fs.statSync(filename).isDirectory() ? `${filename.replace(/\/$/, '')}/index.html` : filename;
  } catch(err) {
    return filename;
  }
}
