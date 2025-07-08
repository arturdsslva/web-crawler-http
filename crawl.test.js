const { normalizeUrl, getUrlsFromHtml } = require("./crawl.js");
const { test, describe, expect } = require("@jest/globals");

describe("normalizeUrl - ", () => {
  test("strip protocol", () => {
    const inputUrl = "https://blog.boot.dev/path";
    const actualOutput = normalizeUrl(inputUrl);
    const expectedOutput = "blog.boot.dev/path";

    expect(actualOutput).toEqual(expectedOutput);
  });

  test("strip trailing slash", () => {
    const inputUrl = "https://blog.boot.dev/path/";
    const actualOutput = normalizeUrl(inputUrl);
    const expectedOutput = "blog.boot.dev/path";

    expect(actualOutput).toEqual(expectedOutput);
  });

  test("capitals", () => {
    const inputUrl = "https://bLog.boot.dev/path/";
    const actualOutput = normalizeUrl(inputUrl);
    const expectedOutput = "blog.boot.dev/path";

    expect(actualOutput).toEqual(expectedOutput);
  });

  test("strip http", () => {
    const inputUrl = "http://blog.boot.dev/path";
    const actualOutput = normalizeUrl(inputUrl);
    const expectedOutput = "blog.boot.dev/path";

    expect(actualOutput).toEqual(expectedOutput);
  });
});

describe("getUrlsFromHtml - ", () => {
  test("absolute urls", () => {
    const inputHtmlBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path">
            Boot.dev Blog
            </a>
        </body>
    </html>        
    `;
    const baseUrl = "https://blog.boot.dev";

    const expectedOutput = ["https://blog.boot.dev/path"];
    const actualOutput = getUrlsFromHtml(inputHtmlBody, baseUrl);

    expect(actualOutput).toEqual(expectedOutput);
  });

  test("relative urls", () => {
    const inputHtmlBody = `
    <html>
        <body>
            <a href="/path/">
            Boot.dev Blog
            </a>
        </body>
    </html>        
    `;
    const baseUrl = "https://blog.boot.dev";

    const expectedOutput = ["https://blog.boot.dev/path/"];
    const actualOutput = getUrlsFromHtml(inputHtmlBody, baseUrl);

    expect(actualOutput).toEqual(expectedOutput);
  });

  test("both relative n absolute urls", () => {
    const inputHtmlBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/">
                Boot.dev Blog
            </a>
            <a href="/path2/">
                Boot.dev Blog
            </a>
        </body>
    </html>        
    `;
    const baseUrl = "https://blog.boot.dev";

    const expectedOutput = [
      "https://blog.boot.dev/path1/",
      "https://blog.boot.dev/path2/",
    ];
    const actualOutput = getUrlsFromHtml(inputHtmlBody, baseUrl);

    expect(actualOutput).toEqual(expectedOutput);
  });

  test("no return in invalid urls", () => {
    const inputHtmlBody = `
    <html>
        <body>
            <a href="invalid">
                Boot.dev Blog
            </a>
            <a href="/path2/">
                Boot.dev Blog
            </a>
        </body>
    </html>        
    `;
    const baseUrl = "https://blog.boot.dev";

    const expectedOutput = ["https://blog.boot.dev/path2/"];
    const actualOutput = getUrlsFromHtml(inputHtmlBody, baseUrl);

    expect(actualOutput).toEqual(expectedOutput);
  });
});
