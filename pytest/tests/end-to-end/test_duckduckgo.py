"""
This module contains a pytest test function for verifying search functionality on the DuckDuckGo
search page. The test conducts a search using the DuckDuckGoPage class from the page_objects 
module and validates the search results. The test is marked as flaky to handle intermittent 
failures, retrying up to 5 times. Selenium WebDriver is used to interact with the web page.
"""

from selenium.webdriver.remote.webdriver import WebDriver
from selenium.common.exceptions import TimeoutException
from page_objects.duckduckgo_page import DuckDuckGoPage
import pytest

@pytest.mark.flaky(retries=5)
def test_duckduckgo_search(driver: WebDriver) -> None:
    """
    Test the DuckDuckGo search functionality.

    Args:
        driver (WebDriver): The Selenium WebDriver instance for browser interactions.

    This function loads the DuckDuckGo page, performs a search, and verifies that the first search
    result matches the expected URL.
    If the first result is not as expected or if an exception occurs, the test will fail.
    """
    duckduckgo_page = DuckDuckGoPage(driver)
    duckduckgo_page.open()
    duckduckgo_page.search("The dev-friendly football API")

    expected_url = "https://www.football-data.org/"

    try:
        first_result = duckduckgo_page.get_first_result()
        assert first_result is not None, "No search results found."
        assert first_result.get_attribute('href') == expected_url, "The expected website was not the first search result."
    except TimeoutException as e:
        pytest.fail(f"Search result was not found within the specified time. Error: {e}")
    except Exception as e:
        pytest.fail(f"Caught an exception during test execution. Error: {e}")
