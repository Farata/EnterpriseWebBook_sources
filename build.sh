#!/bin/bash

set -ex

cd chapter_08/project-ssc-jquery-tdd

npm install -g grunt-cli
npm install
grunt all --force