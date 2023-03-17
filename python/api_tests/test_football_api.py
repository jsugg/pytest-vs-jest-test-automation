import pytest
import requests
import random
import string

class TestFootballAPI:
    base_url = "https://api.football-data.org/v2"

    @pytest.mark.flaky(retries=3)
    def test_response_ok(self):
        response = requests.get(f"{self.base_url}/competitions")
        assert response.status_code == 200
        assert "count" in response.json()

    @pytest.mark.flaky(retries=3)
    def test_resource_not_found(self):
        response = requests.get(f"{self.base_url}/non-existent")
        assert response.status_code == 404

    @pytest.mark.flaky(retries=3)
    def test_unauthorized_request(self):
        random_token = "".join(random.choice(string.ascii_letters + string.digits) for _ in range(32))
        headers = {"X-Auth-Token": random_token}
        response = requests.get(f"{self.base_url}/competitions", headers=headers)
        assert response.status_code == 400
