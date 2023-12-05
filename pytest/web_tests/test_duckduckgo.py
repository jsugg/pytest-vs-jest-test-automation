"""
This module contains a pytest test function for verifying search functionality on the DuckDuckGo
search page. The test conducts a search using the DuckDuckGoPage class from the web_tests.pages 
module and validates the search results. The test is marked as flaky to handle intermittent 
failures, retrying up to 5 times. Selenium WebDriver and WebDriverWait are used to interact with
and wait for elements on the web page.
"""

from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

from web_tests.pages.duckduckgo_page import DuckDuckGoPage

import pytest


@pytest.mark.flaky(retries=5)
def test_duckduckgo_search(driver: WebDriver) -> None:
    """
    Test the DuckDuckGo search functionality.

    Args:
        driver (WebDriver): The Selenium WebDriver instance for browser interactions.

    This function loads the DuckDuckGo page, performs a search, and verifies that the first search
    result matches the expected URL. It uses WebDriverWait to wait for the presence of the first 
    search result.
    If the first result is not as expected or if an exception occurs, the test will fail.
    """
    duckduckgo_page: DuckDuckGoPage = DuckDuckGoPage(driver)
    duckduckgo_page.load()
    duckduckgo_page.search("The dev-friendly football API")

    wait: WebDriverWait = WebDriverWait(driver, 30)
    expected_url = "https://www.football-data.org/"

    try:
        first_result = wait.until(
            EC.presence_of_element_located(DuckDuckGoPage.FIRST_RESULT))
        assert first_result.get_attribute(
            'href') == expected_url, "The expected website was not the first search result."
    except TimeoutException as e:
        pytest.fail(
            f"Search result was not found within the specified time. Error: {e}")
    except Exception as e:
        pytest.fail(
            f"Caught an exception during test execution. Error: {e}")
