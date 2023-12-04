/**
 * This module contains the definition of the TestFootballAPI class.
 */

import * as https from "https";
import { IncomingMessage } from "http";

class TestFootballAPI {
  private base_url: string;
  private agent: any;

  /**
   * Initializes a new instance of the class.
   */
  constructor() {
    this.base_url = "https://api.football-data.org/v4";
    this.agent = new https.Agent();
  }

  /**
   * Makes an HTTP GET request with a timeout.
   *
   * @param path - The API endpoint path.
   * @param headers - The headers to include in the request.
   * @returns A promise that resolves with the response.
   * @throws An error if the request times out.
   */
  async request(
    path: string,
    headers: Record<string, string> = {}
  ): Promise<{ statusCode: number; data: any }> {
    return new Promise((resolve, reject) => {
      const req = https
        .get(
          `${this.base_url}${path}`,
          { headers, agent: this.agent },
          (res: IncomingMessage) => {
            const chunks: Buffer[] = [];
            res.on("data", (chunk: Buffer) => chunks.push(chunk));
            res.on("end", () => {
              const data: string = Buffer.concat(chunks).toString();
              resolve({
                statusCode: res.statusCode as number,
                data: JSON.parse(data),
              });
            });
          }
        )
        .on("error", reject);

      const timeout = setTimeout(() => {
        req.destroy();
        reject(new Error("Request timed out"));
      }, 10000);

      req.on("close", () => {
        clearTimeout(timeout);
      });
    });
  }

  /**
   * Retrieves information about football competitions.
   *
   * @returns A promise that resolves with the response.
   */
  getCompetitions(): Promise<{ statusCode: number; data: any }> {
    return this.request("/competitions");
  }

  /**
   * Simulates a request to a non-existent endpoint.
   *
   * @returns A promise that resolves with the response.
   */
  getNonExistent(): Promise<{ statusCode: number; data: any }> {
    return this.request("/non-existent");
  }

  /**
   * Retrieves football competitions with an unauthorized token.
   *
   * @returns A promise that resolves with the response.
   */
  getCompetitionsUnauthorized(): Promise<{ statusCode: number; data: any }> {
    const randomString: string = Array.from({ length: 32 }, () =>
      ((Math.random() * 36) | 0).toString(36)
    ).join("");
    return this.request("/competitions", { "X-Auth-Token": randomString });
  }
}

export default TestFootballAPI;
