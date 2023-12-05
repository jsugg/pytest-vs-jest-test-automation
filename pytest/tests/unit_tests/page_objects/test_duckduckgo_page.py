"""
This module contains unit tests for the DuckDuckGoSearchPage POM.
"""

from unittest import mock
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from page_objects.duckduckgo_page import DuckDuckGoPage
import pytest


@pytest.fixture
def driver_mock() -> mock.Mock:
    """Fixture to provide a mocked WebDriver."""
    driver = mock.Mock(spec=WebDriver)
    # Mock for a web element
    element_mock = mock.Mock()
    # Configure the driver mock to return the element mock
    driver.find_element.return_value = element_mock
    return driver


class TestDuckDuckGoPage:
    """Test suite for DuckDuckGoPage functionalities."""

    @pytest.mark.unit
    def test_load(self, driver_mock: mock.Mock) -> None:
        """
        Test the loading of the DuckDuckGo search page.
        """
        page = DuckDuckGoPage(driver_mock)
        page.open()
        driver_mock.get.assert_called_once_with("https://duckduckgo.com/")

    @pytest.mark.unit
    def test_search(self, driver_mock: mock.Mock) -> None:
        """
        Test performing a search on the DuckDuckGo search page.
        """
        page = DuckDuckGoPage(driver_mock)
        query = "test query"
        page.search(query)
        driver_mock.find_element.assert_called_once_with(By.NAME, "q")
        driver_mock.find_element.return_value.send_keys.assert_has_calls(
            [mock.call(query), mock.call(Keys.ENTER)])

    @pytest.mark.unit
    def test_get_first_result(self, driver_mock: mock.Mock) -> None:
        """
        Test retrieving the first search result from the DuckDuckGo search page.
        """
        expected_selector: str = "#r1-0 > div > div > a"
        page = DuckDuckGoPage(driver_mock)
        page.get_first_result()
        expected_calls = [mock.call(By.CSS_SELECTOR, expected_selector)]
        driver_mock.find_element.assert_has_calls(
            expected_calls, any_order=True)
