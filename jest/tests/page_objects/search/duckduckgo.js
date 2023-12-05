/**
 * This file contains a class for interacting with DuckDuckGo search page.
 */

class DuckDuckGoSearchPage {
  /**
   * Creates a new instance of the constructor.
   *
   * @param {type} page - the page parameter
   * @return {undefined} no return value
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Opens a new webpage.
   *
   * @return {Promise<void>} A promise that resolves when the webpage is opened successfully.
   */
  async open() {
    await this.page.goto('https://duckduckgo.com/');
  }

  /**
   * Performs a search using the given query.
   *
   * @param {string} query - The search query.
   * @return {Promise} A Promise that resolves when the search is complete.
   */
  async search(query) {
    await this.page.fill('input[name="q"]', query);
    await this.page.press('input[name="q"]', 'Enter');
  }

  /**
   * Retrieves the first search result from the page.
   *
   * @return {Promise<ElementHandle>} The first search result element.
   */
  async getFirstResult() {
    const firstResultSelector = '#r1-0 > div > div > a';
    try {
      await this.page.waitForSelector(firstResultSelector, { timeout: 10000 });
    } catch (error) {
      return error;
    }
    return this.page.$(firstResultSelector);
  }
}

module.exports = DuckDuckGoSearchPage;
