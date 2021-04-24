import { fetchData, fetchDataWithError } from "./sample-async";

describe("async tests", () => {
  test("test resolve matcher", async () => {
    expect.assertions(1);
    await expect(fetchData()).resolves.toBe("apple");
  });

  test("test reject matcher", async () => {
    expect.assertions(1);
    await expect(fetchDataWithError()).rejects.toThrow("Fetch Error");
  });
});

import fetch from "node-fetch";

jest.mock("node-fetch");
const { Response } = jest.requireActual("node-fetch");
