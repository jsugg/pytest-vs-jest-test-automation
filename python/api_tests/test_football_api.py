import requests

class TestFootballAPI:
    base_url = "https://api.football-data.org/v2"

    def test_competitions(self):
        response = requests.get(f"{self.base_url}/competitions")
        assert response.status_code == 200
        assert "count" in response.json()

    def test_unauthorized_request(self):
        response = requests.get(f"{self.base_url}/non-existent")
        assert response.status_code == 404

    def test_not_modified_request(self):
        headers = {"X-Auth-Token": "invalid_token"}
        response = requests.get(f"{self.base_url}/competitions", headers=headers)
        assert response.status_code == 400
