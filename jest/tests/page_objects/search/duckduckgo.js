class DuckDuckGoSearchPage {
    async open(page) {
      this.page = page;
      await this.page.goto('https://duckduckgo.com/');
    }
  
    async search(query) {
      await this.page.fill('input[name="q"]', query);
      await this.page.press('input[name="q"]', 'Enter');
    }
  
    async getFirstResult() {
      const firstResultSelector = '#r1-0 > div > h2 > a';
      await page.waitForSelector(firstResultSelector, { timeout: 10000 });
      return await this.page.$(firstResultSelector);
    }
  }
  
  module.exports = DuckDuckGoSearchPage;
  