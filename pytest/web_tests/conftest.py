"""
This module contains a pytest fixture for setting up and tearing down a Selenium WebDriver for
Chrome. The WebDriver is configured to run in headless mode with a specified window size. This
fixture can be used in test functions to automate browser-based actions for testing web 
applications.
"""

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.webdriver import WebDriver
from webdriver_manager.chrome import ChromeDriverManager

import pytest


@pytest.fixture(scope="function")  # pylint: disable=no-member
def driver() -> WebDriver:
    """
    Pytest fixture that provides a Selenium WebDriver for Chrome.

    This fixture sets up a headless Chrome WebDriver before each test function and tears it down after. 
    The WebDriver runs in headless mode with a window size of 1920x1080.

    Yields:
        WebDriver: An instance of Chrome WebDriver.
    """
    service: Service = Service(executable_path=ChromeDriverManager().install())
    chrome_options: Options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--window-size=1920,1080")
    driver: WebDriver = webdriver.Chrome(
        service=service, options=chrome_options)
    yield driver
    driver.quit()
