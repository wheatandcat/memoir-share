#!/bin/sh

rm -rf clone
rm -rf share
mkdir -p clone
mkdir -p share
cd clone
git clone https://github.com/wheatandcat/memoir
cd ../
node ./scripts/setup/copy.js
