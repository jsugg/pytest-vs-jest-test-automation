// DuckDuckGoSearchPage POM unit tests
const DuckDuckGoSearchPage = require('../../../page_objects/search/duckduckgo.js');

describe('DuckDuckGoSearchPage', () => {
  let page;

  beforeEach(() => {
    page = {
      goto: jest.fn(),
      fill: jest.fn(),
      press: jest.fn(),
      waitForSelector: jest.fn(),
      waitForNavigation: jest.fn(),
      $: jest.fn().mockResolvedValue({ getAttribute: jest.fn() }),
    };
  });

  test('open() navigates to correct URL', async () => {
    const searchPage = new DuckDuckGoSearchPage(page);
    await searchPage.open();
    expect(page.goto).toHaveBeenCalledWith('https://duckduckgo.com/');
  });

  test('search() fills in search input and presses Enter', async () => {
    const searchPage = new DuckDuckGoSearchPage(page);
    await searchPage.open();
    await searchPage.search('jest tutorial');
    expect(page.fill).toHaveBeenCalledWith('input[name="q"]', 'jest tutorial');
    expect(page.press).toHaveBeenCalledWith('input[name="q"]', 'Enter');
  });

  test('getFirstResult() returns correct search result', async () => {
    const searchPage = new DuckDuckGoSearchPage(page);
    await searchPage.open();
    await searchPage.search('jest tutorial');
    await page.waitForNavigation(); // Ensure the search results are loaded

    page.$ = jest.fn().mockResolvedValue({
      getAttribute: jest.fn().mockResolvedValue('https://jestjs.io/docs/getting-started')
    });

    const firstResult = await searchPage.getFirstResult();
    expect(firstResult).not.toBeNull();
  });

  test('getFirstResult() returns null if no search results found', async () => {
    page.$ = jest.fn(() => Promise.resolve(null));
    const searchPage = new DuckDuckGoSearchPage();
    searchPage.page = page;
    const firstResult = await searchPage.getFirstResult();
    expect(firstResult).toBeNull();
  });

  test('getFirstResult() throws error if search result not found after timeout', async () => {
    page.waitForSelector = jest.fn(() => {
      return new Promise((_resolve) => {
        setTimeout(() => {
          return new Error();
        });
      }, 11000);
    });
    const searchPage = new DuckDuckGoSearchPage(page);
    expect(searchPage.getFirstResult()).rejects.toThrow();
  });
});
