# Pytest-Selenium :vs: Jest-Playwright

This repository contains educational content on using two popular Test Automation Frameworks, including source code implementing automation for two simple test scenarios. The purpose is to evaluate the ease of use, performance, and flexibility.

## :scroll: Table of Contents

1. [Introduction](#introduction)
2. [Test Scenarios](#test-scenarios)
3. [Pytest Implementation](#python-implementation)
4. [Jest Implementation](#javascript-implementation)
5. [Results and Analysis](#results-and-analysis)
6. [Conclusion](#conclusion)
7. [License](#license)

## Introduction

Automation is an essential aspect of software development, especially regarding testing. I will compare the two widely-used setups and automate two simple test scenarios in this repository. I will evaluate their ease of use, performance, and flexibility to determine which language offers the best test automation experience.

## Test Scenarios

1. **Test scenario 1**: Verify that the search engine [DuckDuckGo](duckduckgo.com) finds and displays the [expected website](https://www.football-data.org/) in the first place when searching for `The dev-friendly football API`.
2. **Test scenario 2**: Verify that the Football-data [website's REST API](https://api.football-data.org/v2) responds properly to requests made up to receive different response statusses.

## Python Implementation
![img](https://cdn.iconscout.com/icon/free/png-512/python-2-226051.png?f=webp&w=40)
 
In the `pytest/` folder, you'll find the Python implementation for the test scenarios. I chose the **Pytest Framework**, and the popular **Selenium WebDriver** API to automate the DuckDuckGo testing scenario.

### Dependencies

#### [PyTest Framework](https://docs.pytest.org/en/latest/)
![pypi](https://img.shields.io/pypi/v/pytest.svg) ![pypi](https://img.shields.io/pypi/dm/pytest.svg)
#### [Selenium](https://www.selenium.dev)
![pypi](https://img.shields.io/pypi/v/selenium.svg) ![pypi](https://img.shields.io/pypi/dm/selenium.svg)
#### [PyTest Xdist](https://github.com/pytest-dev/pytest-xdist/blob/master/README.rst) plugin
![pypi](https://img.shields.io/pypi/v/pytest-xdist.svg) ![pypi](https://img.shields.io/pypi/dm/pytest-xdist.svg)


### Usage
#### :arrow_forward: Set up and run
1. [Install Python3](https://www.python.org/downloads/).
2. Clone this repository.
3. Navigate to the `pytest/` folder.
4. Install the project dependencies by running `pip install -r requirements.txt`.
5. Execute the test scripts by running `pytest -n 2`.

#### :fast_forward: Parallel execution
By **default**, Pytest runs tests **sequentially**. To run tests in parallel, pass the `-n` flag followed by the *number of cores* to allocate.
```
pytest -n 2
```
will run the tests allocating two CPU cores.

If you want to dinamically allocate the available CPU cores for parallel execution, pass ``auto`` instead of *number of cores*.
```
pytest -n auto
```

#### :clipboard: Reporting
Passing the `--html` flag followed by `=` and a `filename.html`, will create a test report HTML file named _filename.html_.
```
pytest --html=report.html
```

* The report will be saved in the folder where the command was run.

## JavaScript Implementation
![img](https://cdn.iconscout.com/icon/free/png-512/javascript-2752148-2284965.png?f=webp&w=40)

In the `jest/` folder, you'll find the JavaScript implementation for the test scenarios. I chose Facebook's **Jest Framework**, and used Microsoft's popular **Playwright API** to automate the DuckDuckGo testing scenario.

### Dependencies

#### [NodeJS](https://nodejs.org)
![gh](https://avatars.githubusercontent.com/u/9950313?s=40)
#### [Jest Framework](https://jestjs.io/)
![npm](https://img.shields.io/npm/v/jest.svg) ![npm](https://img.shields.io/npm/dm/jest.svg)
#### [Playwright](https://playwright.dev)
![npm](https://img.shields.io/npm/v/allure-playwright.svg) ![npm](https://img.shields.io/npm/dm/allure-playwright.svg) 
#### [Jest Stare](https://github.com/dkelosky/jest-stare/blob/master/README.md) plugin
![npm](https://img.shields.io/npm/v/jest-stare.svg) ![npm](https://img.shields.io/npm/dm/jest-stare.svg) 

### Usage
#### :arrow_forward: Set up and run
1. [Install Node](https://nodejs.org/en/download).
2. Clone this repository.
3. Navigate to the `jest/` folder.
4. Install the project dependencies by running `npm install`.
5. Execute the test scripts by running `npm run test`.

#### :fast_forward: Parallel execution
:point_right: **_By default_**, Jest runs tests **_in parallel_**, allocating the available CPU cores for parallel execution based on heuristics to optimize performance.

If you want to run your tests **_sequentially_**, run
```
npm start test:sequence
```

Or alternatively run 
```
npm test -- --runInBand
```

#### :clipboard: Reporting
To generate a test report run
```
npm run test:report
```

Or alternativelly run 
```
npm run test:sequence:report
```

* The report will be saved in the `<project_root>/jest-stared/` folder.


## Results and Analysis

### Execution Time
#### ![img](https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Pytest_logo.svg/20px-Pytest_logo.svg.png) Pytest + Selenium
Pytest, when combined with Selenium, can sometimes exhibit slower test execution times. This is mainly due to the overhead associated with running and managing multiple browser instances, especially when testing heavy web applications.

#### ![img](https://cdn.iconscout.com/icon/free/png-16/jest-3629451-3031514.png') Jest + Playwright
Jest and Playwright usually deliver faster test execution times compared to the Pytest-Selenium combination. Playwright is designed to run tests concurrently in different browser contexts, allowing it to perform faster overall.
<br/>

### Ease of Use
#### ![img](https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Pytest_logo.svg/20px-Pytest_logo.svg.png) Pytest + Selenium
Pytest is a popular testing framework in the Python ecosystem, known for its simplicity and ease of use. However, using Selenium can sometimes be more complex due to its extensive API and the need to manage browser drivers.

#### ![img](https://cdn.iconscout.com/icon/free/png-16/jest-3629451-3031514.png') Jest + Playwright
Jest is also an easy-to-use testing framework in the JavaScript world, and Playwright simplifies browser automation. The API is more user-friendly and less verbose than Selenium's, making it easier to write and maintain tests.
<br/>

### Flexibility
#### ![img](https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Pytest_logo.svg/20px-Pytest_logo.svg.png) Pytest + Selenium
Pytest is highly flexible, with a vast number of plugins available for customization. Selenium supports multiple browsers and platforms, but it can be more challenging to set up and maintain a stable environment.

#### ![img](https://cdn.iconscout.com/icon/free/png-16/jest-3629451-3031514.png') Jest + Playwright
Jest is a flexible testing framework, and Playwright also supports multiple browsers. Although the number of plugins may be fewer than with Pytest, the combination of Jest and Playwright offers a more modern and streamlined approach to testing web applications.
<br/>

### Pros and Cons

#### Pytest + Selenium
![img](https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Pytest_logo.svg/82px-Pytest_logo.svg.png) <img src="https://selenium.dev/images/selenium_logo_square_green.png" width="60" alt="Selenium"/>

##### Pros
Well-established, mature, and widely-used Python testing framework
Extensive community support and available plugins
Selenium supports a wide range of browsers and platforms

##### Cons
Slower test execution time compared to Jest + Playwright
More complex and verbose API, making it harder to write and maintain tests
Can be challenging to set up and maintain a stable environment
<br/>

#### Jest + Playwright
![img](https://cdn.iconscout.com/icon/free/png-64/jest-3629451-3031514.png) <img src='https://github.githubassets.com/images/icons/emoji/unicode/1f3ad.png' width='65'/>

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

