/**
 * This file contains test cases for the Football API.
 */

import TestFootballAPI from '../../page_objects/api/football-api.ts';

describe('Test the Football API', () => {
  const footballAPI: TestFootballAPI = new TestFootballAPI();
  
  /**
   * Verify if the API request to the Competitions endpoint returns the 'count' property and response status 200.
   */
  jest.retryTimes(3);
  test('Verify if the API request to the Competitions endpoint returns the \'count\' property and response status 200', async () => {
    const response = await footballAPI.getCompetitions();
    expect(response.statusCode).toBe(200);
    expect(response.data).toHaveProperty('count');
  });

  /**
   * Verify if the API request to a non-existent endpoint returns a response status 404.
   */
  jest.retryTimes(3);
  test('Verify if the API request to a non-existent endpoint returns a response status 404', async () => {
    const response = await footballAPI.getNonExistent();
    expect(response.statusCode).toBe(404);
  });

  /**
   * Verify if the API request with an invalid auth-token returns a response status 400.
   */
  jest.retryTimes(3);
  test('Verify if the API request with an invalid auth-token returns a response status 400', async () => {
    const response = await footballAPI.getCompetitionsUnauthorized();
    expect(response.statusCode).toBe(400);
  });
});
