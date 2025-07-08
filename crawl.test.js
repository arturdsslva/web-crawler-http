const { normalizeUrl } = require("./crawl.js");
const { test, describe, expect } = require("@jest/globals");

describe("normalizeUrl - ", () => {
  test("strip protocol", () => {
    const inputUrl = "https://blog.boot.dev/path";
    const actualOutput = normalizeUrl(inputUrl);
    const expected = "blog.boot.dev/path";

    expect(actualOutput).toEqual(expected);
  });

  test("strip trailing slash", () => {
    const inputUrl = "https://blog.boot.dev/path/";
    const actualOutput = normalizeUrl(inputUrl);
    const expected = "blog.boot.dev/path";

    expect(actualOutput).toEqual(expected);
  });

  test("capitals", () => {
    const inputUrl = "https://bLog.boot.dev/path/";
    const actualOutput = normalizeUrl(inputUrl);
    const expected = "blog.boot.dev/path";

    expect(actualOutput).toEqual(expected);
  });

  test("strip http", () => {
    const inputUrl = "http://blog.boot.dev/path";
    const actualOutput = normalizeUrl(inputUrl);
    const expected = "blog.boot.dev/path";

    expect(actualOutput).toEqual(expected);
  });
});
