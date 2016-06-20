#! /usr/bin/env node

'use strict';

/* 因不能使用proxy，此方案放弃
const tinify = require('tinify');

tinify.key = 'LNN9yc5v7KNlzQ4RhcD9pPcGhCkmXGtT';

const file = process.argv[2];

try {
    tinify.fromFile(file).toFile(file);    
} catch(err) {
    console.log(err);
}
*/

const fs = require('fs');
const request = require('request');

const file = process.argv[2];

const KEY = 'LNN9yc5v7KNlzQ4RhcD9pPcGhCkmXGtT';

const req = request({
    url: 'https://api.tinify.com/shrink',
    method: 'POST',
    headers: {
        Authorization: `Basic ${new Buffer(KEY).toString('base64')}`
    }
})
.on('error', err => {
    console.error(`post image error, ${err.message}`);
})
.on('response', res => {
    console.log(res.statusCode);
    if(res.statusCode !== 201) {
        console.warn('error');
        process.exit(1);
        return;
    }

    const url = res.headers.location;
    const ws = fs.createWriteStream(file)
    .on('error', err => {
        console.error(`get image error, ${err.message}`);
    })
    .on('close', () => {
        console.log('success');
    });

    request(url).pipe(ws);
});

fs.createReadStream(file).pipe(req);