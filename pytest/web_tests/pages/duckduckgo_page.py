from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

class DuckDuckGoPage:
    URL = "https://duckduckgo.com/"
    SEARCH_BOX = (By.NAME, "q")
    FIRST_RESULT = (By.CSS_SELECTOR, "#r1-0 > div.ikg2IXiCD14iVX7AdZo1 > h2 > a")

    def __init__(self, driver):
        self.driver = driver

    def load(self):
        self.driver.get(self.URL)

    def search(self, query):
        search_box = self.driver.find_element(*self.SEARCH_BOX)
        search_box.send_keys(query)
        search_box.send_keys(Keys.RETURN)

    def get_first_result(self):
        return self.driver.find_element(*self.FIRST_RESULT)