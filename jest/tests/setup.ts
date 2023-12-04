/**
 * This module contains helper functions for browser setup using playwright.
 */
import { chromium, Browser, Page } from 'playwright';

/**
 * Launches a browser.
 *
 * @return {Promise<Browser>} A promise that resolves to a Browser object.
 */
const launchBrowser = async (): Promise<Browser> => {
  return await chromium.launch();
};

/**
 * Closes the given browser.
 *
 * @param {Browser} browser - The browser to be closed.
 * @return {Promise<void>} A promise that resolves when the browser is closed.
 */
const closeBrowser = async (browser: Browser): Promise<void> => {
  await browser.close();
};

/**
 * Creates a new page in the browser.
 *
 * @param {Browser} browser - The browser object.
 * @return {Promise<Page>} A promise that resolves to the newly created page.
 */
const newPage = async (browser: Browser): Promise<Page> => {
  return await browser.newPage();
};

/**
 * Closes the given page.
 *
 * @param {Page} page - The page to be closed.
 * @return {Promise<void>} - A promise that resolves when the page is closed.
 */
const closePage = async (page: Page): Promise<void> => {
  await page.close();
};

export {
  launchBrowser,
  closeBrowser,
  newPage,
  closePage,
};
