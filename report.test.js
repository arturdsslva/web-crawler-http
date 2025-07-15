const { sortPages } = require("./report.js");
const { describe, test, expect } = require("@jest/globals");

describe("report - ", () => {
  test("sortPages", () => {
    const input = { "https://wagslane.dev": 3, "https://wagslane.dev/path": 1 };

    const actual = sortPages(input);
    const expected = [
      ["https://wagslane.dev", 3],
      ["https://wagslane.dev/path", 1],
    ];

    expect(actual).toEqual(expected);
  });

  test("sortPages more pages", () => {
    const input = {
      "https://wagslane.dev/path3": 3,
      "https://wagslane.dev/path7": 7,
      "https://wagslane.dev/path5": 5,
      "https://wagslane.dev/path9": 9,
      "https://wagslane.dev": 10,
      "https://wagslane.dev/path": 1,
    };

    const actual = sortPages(input);
    const expected = [
      ["https://wagslane.dev", 10],
      ["https://wagslane.dev/path9", 9],
      ["https://wagslane.dev/path7", 7],
      ["https://wagslane.dev/path5", 5],
      ["https://wagslane.dev/path3", 3],
      ["https://wagslane.dev/path", 1],
    ];

    expect(actual).toEqual(expected);
  });
});
