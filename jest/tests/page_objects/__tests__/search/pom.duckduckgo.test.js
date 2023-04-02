// DuckDuckGoSearchPage POM unit tests
const appPath = require('app-root-path').toString();
const DuckDuckGoSearchPage = require(`${appPath}/tests/page_objects/search/duckduckgo`);

describe('DuckDuckGoSearchPage', () => {
  let page;

  beforeEach(() => {
    page = {
      goto: jest.fn(),
      fill: jest.fn(),
      press: jest.fn(),
      waitForSelector: jest.fn(),
      $: jest.fn(),
    };
  });

  test('open() navigates to correct URL', async () => {
    const searchPage = new DuckDuckGoSearchPage(page);
    await searchPage.open(page);
    expect(page.goto).toHaveBeenCalledWith('https://duckduckgo.com/');
  });

  test('search() fills in search input and presses Enter', async () => {
    const searchPage = new DuckDuckGoSearchPage(page);
    await searchPage.open(page);
    await searchPage.search('jest tutorial');
    expect(page.fill).toHaveBeenCalledWith('input[name="q"]', 'jest tutorial');
    expect(page.press).toHaveBeenCalledWith('input[name="q"]', 'Enter');
  });

  test('getFirstResult() returns correct search result', async () => {
    page.$ = jest.fn(() => Promise.resolve({ href: 'https://example.com' }));
    const searchPage = new DuckDuckGoSearchPage(page);
    searchPage.page = page;
    const firstResult = await searchPage.getFirstResult();
    expect(firstResult).not.toBeNull();
    expect(firstResult.href).toBe('https://example.com');
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
      return new Promise(resolve => {
        setTimeout(() => {
          return new Error();});
        }, 6000);
      });
    const searchPage = new DuckDuckGoSearchPage(page);
    expect(searchPage.getFirstResult()).rejects.toThrow();
  });
});
