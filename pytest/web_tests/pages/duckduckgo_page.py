"""
This module defines the DuckDuckGoPage class, which encapsulates methods for interacting with
the DuckDuckGo search page. It uses Selenium WebDriver for browser automation to load the page,
perform searches, and retrieve search results.
"""

from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys


class DuckDuckGoPage:
    """
    Page object model for the DuckDuckGo search page.

    Attributes:
        URL (str): The URL of the DuckDuckGo search page.
        SEARCH_BOX (tuple): Locator for the search box element.
        FIRST_RESULT (tuple): Locator for the first search result element.
    """

    URL: str = "https://duckduckgo.com/"
    SEARCH_BOX: tuple = (By.NAME, "q")
    FIRST_RESULT: tuple = (
        By.CSS_SELECTOR, "#r1-0 > div.ikg2IXiCD14iVX7AdZo1 > h2 > a")

    def __init__(self, driver: WebDriver) -> None:
        """
        Initializes DuckDuckGoPage with a WebDriver instance.

        Args:
            driver (WebDriver): An instance of WebDriver to interact with the browser.
        """
        self.driver: WebDriver = driver

    def load(self) -> None:
        """
        Loads the DuckDuckGo search page using the WebDriver.
        """
        self.driver.get(self.URL)

    def search(self, query: str) -> None:
        """
        Performs a search on the DuckDuckGo page.

        Args:
            query (str): The search query to be entered in the search box.
        """
        search_box: WebElement = self.driver.find_element(*self.SEARCH_BOX)
        search_box.send_keys(query)
        search_box.send_keys(Keys.RETURN)

    def get_first_result(self) -> WebElement:
        """
        Retrieves the first search result from the DuckDuckGo page.

        Returns:
            WebElement: The first search result element.
        """
        return self.driver.find_element(*self.FIRST_RESULT)
