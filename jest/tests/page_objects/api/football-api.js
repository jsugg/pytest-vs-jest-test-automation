/**
 * This module contains the definition of the TestFootballAPI class.
 */
const https = require('https');

class TestFootballAPI {
  /**
   * Initializes a new instance of the class.
   *
   */
  constructor() {
    this.base_url = 'https://api.football-data.org/v4';
  }

  /**
   * Makes an asynchronous HTTP request.
   *
   * @param {string} path - The path of the URL to request.
   * @param {Object} headers - Optional headers to include in the request.
   * @return {Promise} A promise that resolves to an object containing the status code and the response data.
   */
  async request(path, headers = {}) {
    return new Promise((resolve, reject) => {
      https.get(`${this.base_url}${path}`, { headers, agent: this.agent }, (res) => {
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          const data = Buffer.concat(chunks).toString();
          resolve({ statusCode: res.statusCode, data: JSON.parse(data) });
        });
      }).on('error', reject)
        .on('close', () => { clearTimeout(timeout) });

      const timeout = setTimeout(() => {
        req.destroy();
        reject(new Error('Request timed out'));
      }, 10000);
    });
  }

  /**
   * Retrieves a list of competitions.
   *
   * @return {Promise} A promise that resolves with the list of competitions.
   */
  getCompetitions() {
    return this.request('/competitions');
  }

  /**
   * Retrieves a non-existent resource.
   *
   * @return {Promise} A promise that resolves to the result of the request.
   */
  getNonExistent() {
    return this.request('/non-existent');
  }

  /**
   * Retrieves a list of competitions without requiring authorization.
   *
   * @return {Promise} - A promise that resolves to the list of competitions.
   */
  getCompetitionsUnauthorized() {
    const randomString = (() => Array.from({ length: 32 }, () => (Math.random() * 36 | 0).toString(36)).join(''))();
    return this.request('/competitions', { 'X-Auth-Token': randomString });
  }
}

module.exports = TestFootballAPI;
