#!/bin/sh

rm -rf clone
rm -rf share
mkdir -p clone
mkdir -p share
cd clone
git clone https://github.com/wheatandcat/memoir
cd memoir
yarn
yarn codegen
cd ../../
node ./scripts/setup/copy.js
cp -r clone/memoir/src/img/ share/img