# Comparing Python and Javascript for Automating Simple Test Scenarios

This repository contains a comparison of using Python and Javascript to automate simple test cases. The purpose is to evaluate the ease of use, performance, and flexibility of both languages and their respective frameworks for test automation.

## Table of Contents

1. [Introduction](#introduction)
2. [Test Scenarios](#test-scenarios)
3. [Python Implementation](#python-implementation)
4. [Javascript Implementation](#javascript-implementation)
5. [Results and Analysis](#results-and-analysis)
6. [Conclusion](#conclusion)
7. [License](#license)

## Introduction

Automation is an essential aspect of software development, especially when it comes to testing. In this repository, we will compare Python using PyTest Framework and Javascript using NodeJS + Jest + Playwright API for automating two simple test cases. We will evaluate their respective ease of use, performance, and flexibility to determine which language offers the best test automation experience.

## Test Cases

The two test cases that we will automate using Python and Javascript are:

1. **Test case 1**: Automatically verify that the search engine DuckDuckGo correctly finds and displays the [expected website](https://www.football-data.org/) when searching for `The dev-friendly football API`.
2. **Test case 2**: Ensure that a football data website's REST API service works correctly by checking a three different response statusses.

## Python Implementation

In the `python` folder, you'll find the implementation of the test scenarios using Python. We've chosen the popular Selenium WebDriver library for automating the scenarios.

### Dependencies

- Python 3.x
- Selenium WebDriver
- Requests HTTP Library
- Webdriver Manager

### Setup and Execution

1. Install Python3 and necessary dependencies.
2. Navigate to the `python` folder.
3. Install the project-specific necessary dependencies by running `pip install -r requirements.txt`.
4. Execute the test script by running `python test_cases.py --html=report.html`.

## Javascript Implementation [TBD]

In the `nodejs` folder, you'll find the implementation of the test cases using NodeJS. I've chosen the popular Playwright API and Jest Testing Framework for automating the test cases.

### Dependencies [TBD]

- NodeJS
- ChromeDriver
- Playwright API
- Jest Testing Framework

### Setup and Execution [TBD]

1. Install Node.js and necessary dependencies.
2. Navigate to the `nodejs` folder.
3. Execute the test script by running `node test_cases.js`.

## Results and Analysis [TBD]

This section will provide a detailed comparison of the results, including execution time, ease of use, and flexibility. The findings will help us determine the better choice between Python and Javascript for test automation.

## Conclusion [TBD]

A summary of the comparison and recommendations based on the analysis of the results will be provided in this section.

## License [TBD]

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

