const { chromium } = require('playwright');


const launchBrowser = async () => {
  return await chromium.launch();
};

const closeBrowser = async (browser) => {
  await browser.close();
};

const newPage = async (browser) => {
  return await browser.newPage();
};

const closePage = async (page) => {
  await page.close();
};

module.exports = {
  launchBrowser,
  closeBrowser,
  newPage,
  closePage,
};