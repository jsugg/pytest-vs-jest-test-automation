"""
This module contains pytest-based tests for a Football API. It covers scenarios including
successful responses, handling of non-existent resources, and unauthorized access. The tests
use the FootballAPI class to interact with the Football API.
"""

import pytest

from page_objects.football_api import FootballAPI


class TestFootballAPI:
    """Test suite for validating responses from the Football API."""

    @pytest.fixture(scope="class")
    def football_api(self) -> FootballAPI:
        """Fixture to provide a FootballAPI instance for the tests."""
        return FootballAPI()

    @pytest.mark.flaky(retries=3)
    def test_response_ok(self, football_api: FootballAPI) -> None:
        """
        Test to verify if the API responds correctly for valid requests.

        This test ensures that the API returns a status code of 200 (OK)
        and the response contains a 'count' field when querying the 
        competitions endpoint.
        """
        response = football_api.get_competitions()
        assert response.status_code == 200
        assert "count" in response.json()

    @pytest.mark.flaky(retries=3)
    def test_resource_not_found(self, football_api: FootballAPI) -> None:
        """
        Test to verify the API's response for a non-existent resource.

        This test ensures that the API returns a status code of 404 (Not Found) when querying a non-existent endpoint.
        """
        response = football_api.get_nonexistent()
        assert response.status_code == 404

    @pytest.mark.flaky(retries=3)
    def test_unauthorized_access(self, football_api: FootballAPI) -> None:
        """
        Test unauthorized access to the API.

        This function tests the behavior of the API when an unauthorized access attempt is made.
        It uses the FootballAPI class to send a GET request to the "/competitions" endpoint
        with an unauthorized token and then asserts that the response status code is 400,
        indicating a bad request.
        """
        response = football_api.get_competitions_unauthorized()
        assert response.status_code == 400
