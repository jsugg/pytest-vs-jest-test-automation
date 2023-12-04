// DuckDuckGoSearchPage POM unit tests
import DuckDuckGoSearchPage from "../../../page_objects/search/duckduckgo.ts";
import { Browser, Page, BrowserContext } from "playwright";
import * as playwright from "playwright";

describe("DuckDuckGoSearchPage", () => {
  let page: Page;
  let context: BrowserContext;
  let searchPage: DuckDuckGoSearchPage;
  let browser: Browser;

  beforeAll(async () => {
    browser = await playwright.chromium.launch(); // Launches a Chromium browser
  });

  // beforeEach is executed before each test in this suite
  beforeEach(async () => {
    context = await browser.newContext();
    page = await context.newPage();
    searchPage = new DuckDuckGoSearchPage(page);
  });

  // afterEach is executed after each test in this suite
  afterEach(async () => {
    await context.close();
  });

  // afterAll is executed once after all tests in this suitef
  afterAll(async () => {
    await browser.close();
  });

  /**
   * Test that the `open` method navigates to the correct URL.
   */
  test("open() navigates to correct URL", async () => {
    await searchPage.open();
    const currentUrl = page.url();
    expect(currentUrl).toBe("https://duckduckgo.com/");
  });

  /**
   * Test that the `search` method fills in the search input and presses Enter.
   */
  test("search() fills in search input and presses Enter", async () => {
    const searchQuery = "jest tutorial";
    await searchPage.open();
    await page.waitForSelector('input[name="q"]');
    await searchPage.search(searchQuery);

    await page.waitForNavigation();
    const currentUrl = new URL(page.url());
    expect(currentUrl.searchParams.get("q")).toBe(searchQuery);
  }, 30000);

  /**
   * Test that the `getFirstResult` method returns the correct search result.
   */
  test("getFirstResult() returns correct search result", async () => {
    await searchPage.open();
    await searchPage.search("jest tutorial");
    await page.waitForNavigation(); // Ensure the search results are loaded

    const firstResultSelector = "#r1-0 > div > h2 > a";
    await page.waitForSelector(firstResultSelector); // Wait for the first result to be present

    const firstResult = await searchPage.getFirstResult();
    expect(firstResult).not.toBeNull();

    if (firstResult) {
      const href = await firstResult.getAttribute("href");
      expect(href).toBe("https://jestjs.io/docs/getting-started");
    }
  }, 30000);

  /**
   * Test that the `getFirstResult` method returns null if no search results are found.
   */
  test("getFirstResult() returns null if no search results found", async () => {
    const pageMock: Page = {
      ...page,
      $: jest.fn().mockResolvedValue(null),
    };
    page.$ = jest.fn().mockResolvedValue(null);
    searchPage = new DuckDuckGoSearchPage(pageMock);

    const firstResult = await searchPage.getFirstResult();

    expect(firstResult).toBeNull();
  });

  /**
   * Test that the `getFirstResult` method throws an error if the search result is not found after a timeout.
   */
  test("getFirstResult() throws error if search result not found after timeout", async () => {
    page.$ = jest.fn().mockResolvedValue(null);
    searchPage = new DuckDuckGoSearchPage(page);
    const waitForSelectorMock = jest
      .fn()
      .mockRejectedValue(new Error("Timeout"));
    page.waitForSelector = waitForSelectorMock;

    try {
      await searchPage.getFirstResult();
    } catch (error: any) {
      expect(error.message).toBe("Timeout");
    }

    expect(waitForSelectorMock).toHaveBeenCalledWith("#r1-0 > div > h2 > a", {
      timeout: 10000,
    });
  });
});
