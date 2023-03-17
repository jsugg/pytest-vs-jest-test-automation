const https = require('https');

class TestFootballAPI {
  constructor() {
    this.base_url = 'https://api.football-data.org/v2';
  }

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

  getCompetitions() {
    return this.request('/competitions');
  }

  getNonExistent() {
    return this.request('/non-existent');
  }

  getCompetitionsUnauthorized() {
    const randomString = (() => Array.from({length: 32}, () => (Math.random() * 36 | 0).toString(36)).join(''))();
    return this.request('/competitions', { 'X-Auth-Token': randomString });
  }
}

module.exports = TestFootballAPI;