import DuckDuckGoSearchPage from '../../page_objects/search/duckduckgo.ts';
import { launchBrowser, closeBrowser, newPage, closePage } from '../../setup.ts';
import { Browser, Page } from 'playwright';

let browser: Browser;
let page: Page;

// Launch the browser before all tests
beforeAll(async () => {
  browser = await launchBrowser();
});

// Close the browser after all tests
afterAll(async () => {
  await closeBrowser(browser);
});

// Create a new page before each test
beforeEach(async () => {
  page = await newPage(browser);
});

// Close the page after each test
afterEach(async () => {
  await closePage(page);
});

// Describe the test suite for DuckDuckGo search
describe('Test DuckDuckGo search', () => {
  // Set a retry limit for this test
  jest.retryTimes(5);

  // Test: Search for "The dev-friendly football API" and check the first result
  test('Search for "The dev-friendly football API" and check first result', async () => {
    // Create an instance of DuckDuckGoSearchPage
    const searchPage = new DuckDuckGoSearchPage(page);

    // Open the DuckDuckGo search page
    await searchPage.open();

    // Perform a search
    await searchPage.search('The dev-friendly football API');

    // Get the first search result
    const firstResult = await searchPage.getFirstResult();

    // Assert that the first result is truthy
    expect(firstResult).toBeTruthy();

    let href = null;
    // Get the href attribute of the first result and assert its value
    if (firstResult) {
        href = await firstResult.getAttribute('href');
    }
    expect(href).toBe('https://www.football-data.org/');
  }, 30000);
});
