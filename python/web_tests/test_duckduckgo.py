import pytest
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from web_tests.pages.duckduckgo_page import DuckDuckGoPage

def test_duckduckgo_search(driver):
    duckduckgo_page = DuckDuckGoPage(driver)
    duckduckgo_page.load()
    duckduckgo_page.search("The dev-friendly football API")

    wait = WebDriverWait(driver, 10)

    try:
        first_result = wait.until(EC.presence_of_element_located(DuckDuckGoPage.FIRST_RESULT))
        if first_result:
            assert first_result.get_attribute('href') == "https://www.football-data.org/"
        else:
            pytest.fail("No search results found.")
    except TimeoutException:
        pytest.fail("Timeout waiting for search results.")
    except Exception:
        pytest.fail("No search results found.")