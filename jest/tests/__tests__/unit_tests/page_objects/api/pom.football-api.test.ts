// TestFootballAPI POM unit tests
import * as https from "https";
import TestFootballAPI from "../../../../page_objects/api/football-api.ts";

jest.mock("https");

describe("TestFootballAPI", () => {
  let api: TestFootballAPI;
  let mockRequest: jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    api = new TestFootballAPI();
    mockRequest = api.request = jest.fn();
  });

  test("request() sends HTTP GET request with correct URL and headers", async () => {
    const path: string = "/some/path";
    const headers: Record<string, string> = { "X-Header": "Value" };
    await api.request(path, headers);
    expect(mockRequest).toHaveBeenCalledWith(
      path,
      expect.objectContaining(headers)
    );
  });

  test("request() resolves with response data and status code when request succeeds", async () => {
    const statusCode: number = 200;
    const data: Record<string, any> = { foo: "bar" };
    const response: { statusCode: number; data: string } = {
      statusCode,
      data: JSON.stringify(data),
    };
    mockRequest.mockResolvedValueOnce(response);
    const result = await api.request("/some/path");
    expect(result).toEqual({ statusCode, data: JSON.stringify(data) });
  });

  test("request() rejects with error when request times out", async () => {
    mockRequest.mockRejectedValueOnce(new Error("Request timed out"));
    await expect(api.request("/some/path")).rejects.toThrowError(
      "Request timed out"
    );
  });

  test("getCompetitions() calls request() with correct path", async () => {
    await api.getCompetitions();
    expect(api.request).toHaveBeenCalledWith("/competitions");
  });

  test("getNonExistent() calls request() with correct path", async () => {
    await api.getNonExistent();
    expect(api.request).toHaveBeenCalledWith("/non-existent");
  });

  test("getCompetitionsUnauthorized() calls request() with correct path and headers", async () => {
    const response: { statusCode: number; data: any } = {
      statusCode: 401,
      data: { message: "Unauthorized" },
    };
    mockRequest.mockReturnValueOnce(response);
    await api.getCompetitionsUnauthorized();
    expect(api.request).toHaveBeenCalledWith(
      "/competitions",
      expect.any(Object)
    );
  });
});
