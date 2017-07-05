# phantomcss-kit

[![Build Status](https://travis-ci.org/ctco-dev/phantomcss-kit.svg?branch=master)](https://travis-ci.org/ctco-dev/phantomcss-kit)

This NPM utility library provides a quick way to run a pre-defined PhantomCSS test suite against your web page.

## Requirements

- Python is required to run CasperJS.

## Usage

1. Install:

```
npm i phantomcss-kit --save-dev
```
  
2. Create a page you would like run the tests against. Mark the elements to test using the `pk-test` attribute:

```
<div pk-test="first">Hello!</div>
```
  
The value of `pk-test` will be used as the name of the test case.

3. Run the tests:

```
pk-test --url=%ABSOLUTE_PAGE_URL%
```
  
### Generating test cases

To generate new test cases, use the `--rebase` flag:
 
``` 
pk-test --url=%ABSOLUTE_PAGE_URL% --rebase
```
 
### Running a local web server

If you don't have a local web server at hand, you can start one together with the test suite:

```
pk-test --url=%ABSOLUTE_PAGE_URL% --serveDir=%PATH_TO_TEST_FOLDER%
```
 
You can set a custom port using the optional `--port` argument.

### Configuring a delay

In case you are unable to take a screenshot of some element because it hasn't loaded yet, you can configure a fixed delay before
taking screenshots:

```
pk-test --url=%ABSOLUTE_PAGE_URL% --wait=3000
```
 
### Tolerance

The tolerance level can be adjusting using the `--tolerance` argument:

```
pk-test --url=%ABSOLUTE_PAGE_URL% --tolerance=1.25
```

## More information

- [https://github.com/Huddle/PhantomCSS](PhantomCSS)
- [http://casperjs.org/](CasperJS)
