"""
This module contains tests for the DuckDuckGo search page functionality. 
It uses the Selenium WebDriver for simulating browser interactions and pytest for 
structuring and executing the tests. The tests include loading the DuckDuckGo page, 
executing a search, and retrieving the first result. Mocks are used to simulate the 
WebDriver behavior.
"""

from unittest import mock

from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.common.keys import Keys
from web_tests.pages.duckduckgo_page import DuckDuckGoPage

import pytest


class TestDuckDuckGoPage:
    """Test suite for DuckDuckGoPage functionalities."""

    @pytest.mark.unit
    def test_load(self) -> None:
        """
        Test the loading of the DuckDuckGo search page.

        This test verifies that the DuckDuckGoPage's load method correctly invokes the WebDriver's get method
        with the appropriate URL.
        """
        driver_mock: mock.Mock = mock.Mock(spec=WebDriver)
        page: DuckDuckGoPage = DuckDuckGoPage(driver_mock)
        page.load()
        driver_mock.get.assert_called_once_with(page.URL)

    @pytest.mark.unit
    def test_search(self) -> None:
        """
        Test performing a search on the DuckDuckGo search page.

        This test verifies that the search method on DuckDuckGoPage correctly finds the search box element,
        sends the search query, and initiates the search by sending the RETURN key.
        """
        driver_mock: mock.Mock = mock.Mock(spec=WebDriver)
        page: DuckDuckGoPage = DuckDuckGoPage(driver_mock)
        query: str = "test query"
        search_box_mock: mock.Mock = driver_mock.find_element.return_value
        page.search(query)
        driver_mock.find_element.assert_called_once_with(*page.SEARCH_BOX)
        search_box_mock.send_keys.assert_has_calls(
            [mock.call(query), mock.call(Keys.RETURN)])

    @pytest.mark.unit
    def test_get_first_result(self) -> None:
        """
        Test retrieving the first search result from the DuckDuckGo search page.

        This test verifies that the get_first_result method on DuckDuckGoPage correctly finds the first result
        element using the WebDriver.
        """
        driver_mock: mock.Mock = mock.Mock(spec=WebDriver)
        page: DuckDuckGoPage = DuckDuckGoPage(driver_mock)
        page.get_first_result()
        driver_mock.find_element.assert_called_once_with(*page.FIRST_RESULT)
