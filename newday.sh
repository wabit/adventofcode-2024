#!/bin/bash
day="$1"
if [ -d "$day" ]; then
    echo "Day $day already exists"
    exit 1
else
  mkdir -p "$day"/js
  touch "$day"/README.md "$day"/input.file "$day"/js/index.js
  echo "Creating day $day"
fi