"""
This module contains pytest-based tests for a Football API. It covers scenarios including
successful responses, handling of non-existent resources, and unauthorized access. The tests
use the requests library to make HTTP requests and random and string libraries to generate
random tokens for unauthorized access simulation.
"""

import random
import string
from typing import Dict, Any

import requests
import pytest


class TestFootballAPI:
    """Test suite for validating responses from the Football API."""

    base_url: str = "https://api.football-data.org/v4"

    @pytest.mark.flaky(retries=3)
    def test_response_ok(self) -> None:
        """
        Test to verify if the API responds correctly for valid requests.

        This test ensures that the API returns a status code of 200 (OK)
        and the response contains a 'count' field when querying the 
        competitions endpoint.
        """
        response: requests.Response = requests.get(
            f"{self.base_url}/competitions", timeout=10)
        assert response.status_code == 200
        assert "count" in response.json()

    @pytest.mark.flaky(retries=3)
    def test_resource_not_found(self) -> None:
        """
        Test to verify the API's response for a non-existent resource.

        This test ensures that the API returns a status code of 404 (Not Found) when querying a non-existent endpoint.
        """
        response: requests.Response = requests.get(
            f"{self.base_url}/non-existent", timeout=10)
        assert response.status_code == 404

    @pytest.mark.flaky(retries=3)
    def test_unauthorized_request(self) -> None:
        """
        Test to verify the API's response to unauthorized access.

        This test checks that the API returns a status code of 400 (Bad Request) when an unauthorized token is used
        in the request headers.
        """
        random_token: str = "".join(random.choice(
            string.ascii_letters + string.digits) for _ in range(32))
        headers: Dict[str, Any] = {"X-Auth-Token": random_token}
        response: requests.Response = requests.get(
            f"{self.base_url}/competitions", headers=headers, timeout=10)
        assert response.status_code == 400
