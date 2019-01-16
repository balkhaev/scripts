const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const KEY = process.env['MASSKEY'];

if (fs.existsSync(path.join(__dirname, 'file.zip'))) {
  console.log('File already decrypted!');
} else {
  fs.createReadStream(path.join(__dirname, 'file.zip.enc'))
    .pipe(crypto.createDecipher('aes-256-cbc', Buffer.from(KEY, 'base64')))
    .pipe(fs.createWriteStream(path.join(__dirname, 'file.zip')));

  console.log('File decrypted, path:', path.join(__dirname, 'file.zip'));
}

