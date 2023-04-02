class DuckDuckGoSearchPage {
    constructor(page) { 
      this.page = page;
    }

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
      try {
        await this.page.waitForSelector(firstResultSelector, { timeout: 5000 });
      } catch (error) {
        console.log(error);
        return error;
      }
      return this.page.$(firstResultSelector)? this.page.$(firstResultSelector): null;
    }
  }
  
  module.exports = DuckDuckGoSearchPage;
  