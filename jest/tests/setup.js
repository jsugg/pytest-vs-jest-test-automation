/**
 * This module provides utility functions for launching a browser using playwright.
 */

const { chromium } = require('playwright');


/**
 * Launches a browser using the chromium library.
 *
 * @return {Promise} A promise that resolves to the launched browser.
 */
const launchBrowser = async () => {
  return await chromium.launch();
};

/**
 * Closes the browser.
 *
 * @param {Object} browser - The browser instance to be closed.
 */
const closeBrowser = async (browser) => {
  await browser.close();
};

/**
 * Creates a new page in the browser.
 *
 * @param {Object} browser - The browser object.
 * @return {Object} The new page object.
 */
const newPage = async (browser) => {
  return await browser.newPage();
};

/**
 * Closes the given page.
 *
 * @param {Page} page - The page to be closed.
 * @return {Promise<void>} - A promise that resolves when the page is closed.
 */
const closePage = async (page) => {
  await page.close();
};

module.exports = {
  launchBrowser,
  closeBrowser,
  newPage,
  closePage,
};