/**
 * This file contains a class for interacting with DuckDuckGo search page.
 */

import { ElementHandle, Page } from "playwright";

/**
 * Represents a page object for DuckDuckGo search page.
 */
class DuckDuckGoSearchPage {
  private page: Page;

  /**
   * Creates an instance of DuckDuckGoSearchPage.
   * @param page - The Playwright page instance.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Opens the DuckDuckGo search page.
   */
  async open(): Promise<void> {
    await this.page.goto("https://duckduckgo.com/");
  }

  /**
   * Searches for a query on the DuckDuckGo search page.
   * @param query - The search query.
   */
  async search(query: string): Promise<void> {
    await this.page.fill('input[name="q"]', query);
    await this.page.press('input[name="q"]', "Enter");
  }

  /**
   * Retrieves the first search result from the DuckDuckGo search page.
   * @returns A Promise that resolves with the first search result or null if not found.
   */
  async getFirstResult(): Promise<null | ElementHandle> {
    const firstResultSelector = "#r1-0 > div > h2 > a";
    try {
      await this.page.waitForSelector(firstResultSelector, { timeout: 10000 });
    } catch (error) {
      return null;
    }
    return this.page.$(firstResultSelector);
  }
}

export default DuckDuckGoSearchPage;
