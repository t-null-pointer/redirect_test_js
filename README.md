# redirect_test_js

## what it does

Takes an initial URL and verifies that it is redirected with the correct http status code to the correct new URL.

## how to use

1. install node.js
2. change to folder with checked out source code in command prompt
3. npm install
4. node test.js [filepath/filename] [httpStatusCode]
5. to run example: node test.js exampleFiles/exampleLinks.csv

## command line arguments

arg |  |
--- | --- |
[filename]| required
[httpStatusCode]| optional - default is 301

## formats

Supported file extensions: .txt and .csv

Expected format in file:
> initial link,expected link
>
> http://example.com,https://www.example.com

---

2018
