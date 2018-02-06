# redirect_test_js

## what it does

Takes an initial URL and verifies that it is redirected (301) to the correct new URL.

## how to use

1. install node.js
2. change to folder with source code in command prompt
3. npm install
4. node test.js [filepath/filename] [HttpStatusCode]
5. to run example: node test.js exampleFiles/exampleLinks.csv

## command line arguments

|<filename>| required|
|<HttpStatusCode>| optional - default is 301|

## formats

Supported: .txt and .csv

Expected format in file:
> initial link,expected link
>
> http://example.com,https://www.example.com
