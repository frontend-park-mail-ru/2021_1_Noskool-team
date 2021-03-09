#!/bin/sh
npm i
npm run build
cp ./server/index.js ./build/
cp ./out/index.html ./build/