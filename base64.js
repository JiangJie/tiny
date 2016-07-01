#! /usr/bin/env node

'use strict';

/*
功能：将图片文件转成base64
使用方法：base64 name.png
*/

const path = require('path');
const fs = require('fs');

const file = process.argv[2];
const ext = path.extname(file);
const base64File = `${path.basename(file, ext)}.txt`;

function main() {
    let data = new Buffer(fs.readFileSync(file)).toString('base64');

    data = `data:image/${ext.replace(/\./g, '')};base64,${data}`;

    fs.writeFileSync(base64File, data);

    console.log('success');

    process.exit(0);
}

main();