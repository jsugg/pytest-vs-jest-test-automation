const TestFootballAPI = require('../../page_objects/api/football-api');

describe('Test the Football API', () => {
  const footballAPI = new TestFootballAPI();
  
  jest.retryTimes(3);
  test('Verify if the API request to the Competitions endpoint returns the \'count\' property and response status 200', async () => {
    const response = await footballAPI.getCompetitions();
    expect(response.statusCode).toBe(200);
    expect(response.data).toHaveProperty('count');
  });

  jest.retryTimes(3);
  test('Verify if the API request to an unexistent endpoint returns a response status 404', async () => {
    const response = await footballAPI.getNonExistent();
    expect(response.statusCode).toBe(404);
  });

  jest.retryTimes(3);
  test('Verify if the API request to with an invalid auth-token returns a response status 400', async () => {
    const response = await footballAPI.getCompetitionsUnauthorized();
    expect(response.statusCode).toBe(400);
  });
});
