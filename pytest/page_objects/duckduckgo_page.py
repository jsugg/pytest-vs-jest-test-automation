from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class DuckDuckGoPage:
    """
    Represents a page object for the DuckDuckGo search page.
    """

    def __init__(self, driver: WebDriver):
        """
        Creates an instance of DuckDuckGoSearchPage.
        
        Args:
            driver (WebDriver): The Selenium WebDriver instance.
        """
        self.driver = driver

    def open(self):
        """
        Opens the DuckDuckGo search page.
        """
        self.driver.get("https://duckduckgo.com/")

    def search(self, query: str):
        """
        Searches for a query on the DuckDuckGo search page.

        Args:
            query (str): The search query.
        """
        search_input = self.driver.find_element(By.NAME, "q")
        search_input.send_keys(query)
        search_input.send_keys(Keys.ENTER)

    def get_first_result(self):
        """
        Retrieves the first search result from the DuckDuckGo search page.

        Returns:
            The first search result element or None if not found.
        """
        first_result_selector = "#r1-0 > div > div > a"
        try:
            WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, first_result_selector))
            )
            return self.driver.find_element(By.CSS_SELECTOR, first_result_selector)
        except TimeoutException:
            return None
