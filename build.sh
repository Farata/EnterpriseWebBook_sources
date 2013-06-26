#!/bin/bash

set -ex

echo "Building app from Chapter 08"
cd chapter_08/project-ssc-jquery-tdd

npm install -g grunt-cli
npm install
grunt all --force

cd -