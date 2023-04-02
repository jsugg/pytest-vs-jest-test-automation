from unittest import mock
import pytest
from selenium.webdriver.common.keys import Keys
from web_tests.pages.duckduckgo_page import DuckDuckGoPage

class TestDuckDuckGoPage:

    @pytest.mark.unit
    def test_load(self):
        driver_mock = mock.Mock()
        page = DuckDuckGoPage(driver_mock)
        page.load()
        driver_mock.get.assert_called_once_with(page.URL)

    @pytest.mark.unit
    def test_search(self):
        driver_mock = mock.Mock()
        page = DuckDuckGoPage(driver_mock)
        query = "test query"
        search_box_mock = driver_mock.find_element.return_value
        page.search(query)
        driver_mock.find_element.assert_called_once_with(*page.SEARCH_BOX)
        search_box_mock.send_keys.assert_has_calls([mock.call(query), mock.call(Keys.RETURN)])


    @pytest.mark.unit
    def test_get_first_result(self):
        driver_mock = mock.Mock()
        page = DuckDuckGoPage(driver_mock)
        page.get_first_result()
        driver_mock.find_element.assert_called_once_with(*page.FIRST_RESULT)
