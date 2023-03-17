# Comparing PyTest-Selenium vs Jest-NodeJS-Playwright for Automating Simple Test Scenarios

This repository contains a comparison of using Python and Javascript to automate simple test cases. The purpose is to evaluate the ease of use, performance, and flexibility of both languages and their respective frameworks for test automation.

## :scroll: Table of Contents

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
2. **Test case 2**: Ensure that a football data [website's REST API](https://api.football-data.org/v2) service works correctly by checking a three different response statusses.

## Python Implementation

In the `pytest` folder, you'll find the implementation of the test scenarios using Python. We've chosen the popular Selenium WebDriver library for automating the scenarios.

### Dependencies

#### [PyTest Framework](https://docs.pytest.org/en/latest/)
![pypi](https://img.shields.io/pypi/v/pytest.svg)
#### [Selenium bindings for Python](https://www.selenium.dev)
![pypi](https://img.shields.io/pypi/v/selenium.svg)
#### [PyTest Xdist reporting plugin](https://github.com/pytest-dev/pytest-xdist/blob/master/README.rst)
![pypi](https://img.shields.io/pypi/v/pytest-xdist.svg)


### Setup and Execution

1. Install Python3 and necessary dependencies.
2. Navigate to the `pytest` folder.
3. Install the project-specific dependencies by running `pip install -r requirements.txt`.
4. Execute the test script by running `pytest -n 2`. To generate a test report run `pytest -n 2 --html=report.html`
Note: the -n 2 flag indicates the number of parallel runners to be used. The report will be saved to the project's root folder.

## Javascript Implementation

In the `jest` folder, you'll find the implementation of the test cases using NodeJS with Jest. I've chosen the popular Playwright API and Jest Testing Framework for automating the test cases.

### Dependencies

#### [NodeJS](https://nodejs.org)
#### [Jest Testing Framework](https://jestjs.io/)
![npm](https://img.shields.io/npm/dm/jest.svg) ![npm](https://img.shields.io/npm/v/jest.svg)
#### [Playwright](https://playwright.dev)
![npm](https://img.shields.io/npm/dm/allure-playwright.svg) ![npm](https://img.shields.io/npm/v/allure-playwright.svg) 
#### [Jest Stare](https://github.com/dkelosky/jest-stare/blob/master/README.md) reporting plugin
![npm](https://img.shields.io/npm/dm/jest-stare.svg) ![npm](https://img.shields.io/npm/v/jest-stare.svg) 

### Setup and Execution

1. Install Node and necessary dependencies.
2. Navigate to the `jest` folder.
3. Install the project dependencies by running `npm install`.
3. Execute the test script by running `npm run test`. To generate a test report run `npm run test:report`.
Note: the report will be saved to the jest-stared folder.

## Results and Analysis

### Execution Time
#### Pytest + Selenium
Pytest, when combined with Selenium, can sometimes exhibit slower test execution times. This is mainly due to the overhead associated with running and managing multiple browser instances, especially when testing heavy web applications.

#### Jest + Playwright
Jest and Playwright usually deliver faster test execution times compared to the Pytest-Selenium combination. Playwright is designed to run tests concurrently in different browser contexts, allowing it to perform faster overall.

### Ease of Use
#### Pytest + Selenium
Pytest is a popular testing framework in the Python ecosystem, known for its simplicity and ease of use. However, using Selenium can sometimes be more complex due to its extensive API and the need to manage browser drivers.

#### Jest + Playwright
Jest is also an easy-to-use testing framework in the JavaScript world, and Playwright simplifies browser automation. The API is more user-friendly and less verbose than Selenium's, making it easier to write and maintain tests.

### Flexibility
#### Pytest + Selenium
Pytest is highly flexible, with a vast number of plugins available for customization. Selenium supports multiple browsers and platforms, but it can be more challenging to set up and maintain a stable environment.

#### Jest + Playwright
Jest is a flexible testing framework, and Playwright also supports multiple browsers. Although the number of plugins may be fewer than with Pytest, the combination of Jest and Playwright offers a more modern and streamlined approach to testing web applications.

### Pros and Cons

#### Pytest + Selenium
##### Pros
Well-established, mature, and widely-used Python testing framework
Extensive community support and available plugins
Selenium supports a wide range of browsers and platforms

##### Cons
Slower test execution time compared to Jest + Playwright
More complex and verbose API, making it harder to write and maintain tests
Can be challenging to set up and maintain a stable environment

#### Jest + Playwright

##### Pros
Fast test execution time
Modern and streamlined API, making it easier to write and maintain tests
Playwright simplifies browser automation and supports multiple browsers

##### Cons
Fewer available plugins compared to Pytest
Requires proficiency in JavaScript (NodeJS) instead of Python
The ecosystem is relatively newer compared to Pytest + Selenium

## Conclusion

The choice between these two test automation setups largely depends on the specific requirements, existing skillsets, and priorities of the development team. Pytest + Selenium might be better suited for teams with Python expertise and a need for extensive customization, while Jest + Playwright could be a better choice for teams focused on fast test execution times and a more modern, user-friendly API.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

