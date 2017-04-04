#!/bin/sh

pbjs -t static-module -w commonjs -o bundle.js constants.proto match.proto
pbts -o bundle.d.ts bundle.js