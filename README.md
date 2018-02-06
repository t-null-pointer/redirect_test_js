# redirect_test_js

## What it does

Takes an initial URL and verifies that it is redirected (301) to the correct new URL.

## How to use

1. install node.js
2. change to folder with source code in command prompt
3. npm install
4. node test.js pathToFile/linksToTest.csv
5. to run examples: node test.js exampleFiles/exampleLinks.csv

## Formats

Supported: .txt and .csv

Expected format in file:
> initial link,expected link
>
> http://example.com,https://www.example.com
