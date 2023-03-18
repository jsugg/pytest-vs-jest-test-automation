const DuckDuckGoSearchPage = require('../../page_objects/search/duckduckgo');
const { launchBrowser, closeBrowser, newPage, closePage } = require('../../setup');


beforeAll(async () => {
  browser = await launchBrowser();
});

afterAll(async () => {
  await closeBrowser(browser);
});

beforeEach(async () => {
  page = await newPage(browser);
});

afterEach(async () => {
  await closePage(page);
});

describe('Test DuckDuckGo search', () => {
  jest.retryTimes(5);
  test('Search for "The dev-friendly football API" and check first result', async () => {
    const searchPage = new DuckDuckGoSearchPage();
    await searchPage.open(page);
    await searchPage.search('The dev-friendly football API');

    const firstResult = await searchPage.getFirstResult();
    expect(firstResult).toBeTruthy();
    const href = await firstResult.getAttribute('href');
    expect(href).toBe('https://www.football-data.org/');
  }, 10000);
});