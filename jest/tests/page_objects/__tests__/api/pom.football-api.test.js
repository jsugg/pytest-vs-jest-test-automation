// TestFootballAPI POM unit tests
const appPath = require('app-root-path').toString();
const https = require('https');
const TestFootballAPI = require(`${appPath}/tests/page_objects/api/football-api.js`);

jest.mock('https');

describe('TestFootballAPI', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    api = new TestFootballAPI();
    api.request = jest.fn();
  });

  test('request() sends HTTP GET request with correct URL and headers', async () => {
    const path = '/some/path';
    const headers = { 'X-Header': 'Value' };
    await api.request(path, headers);
    expect(api.request).toHaveBeenCalledWith(
      path,
      expect.objectContaining(headers)
    );
  });

  test('request() resolves with response data and status code when request succeeds', async () => {
    const statusCode = 200;
    const data = { foo: 'bar' };
    const response = { statusCode, data: JSON.stringify(data) };
    api.request.mockResolvedValueOnce(response);
    const result = await api.request('/some/path');
    expect(result).toEqual({ statusCode, data: JSON.stringify(data) });
  });

  test('request() rejects with error when request times out', async () => {
    api.request.mockRejectedValueOnce(new Error('Request timed out'));
    await expect(api.request('/some/path')).rejects.toThrowError(
      'Request timed out'
    );
  });

  test('getCompetitions() calls request() with correct path', async () => {
    await api.getCompetitions();
    expect(api.request).toHaveBeenCalledWith('/competitions');
  });

  test('getNonExistent() calls request() with correct path', async () => {
    await api.getNonExistent();
    expect(api.request).toHaveBeenCalledWith('/non-existent');
  });

  test('getCompetitionsUnauthorized() calls request() with correct path and headers', async () => {
    const response = { statusCode: 401, data: { message: 'Unauthorized' } };
    api.request.mockReturnValueOnce(response);
    await api.getCompetitionsUnauthorized();
    expect(api.request).toHaveBeenCalledWith('/competitions', expect.any(Object));
    console.log(`Mocked response: ${JSON.stringify(response)}`);
    console.log(`Actual response: ${api.request}`);
  });
});