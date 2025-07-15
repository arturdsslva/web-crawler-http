const { JSDOM } = require("jsdom");

async function crawl(baseUrl, currentUrl, pages) {
  const baseUrlObj = new URL(baseUrl);
  const currentUrlObj = new URL(currentUrl);

  if (baseUrlObj.hostname !== currentUrlObj.hostname) return pages;

  const normalizedCurrentUrl = normalizeUrl(currentUrl);

  if (pages[normalizedCurrentUrl] > 0) {
    pages[normalizedCurrentUrl]++;
    return pages;
  }

  pages[normalizedCurrentUrl] = 1;

  console.log("crawling => " + currentUrl);

  try {
    const resp = await fetch(currentUrl);

    if (resp.status > 399) {
      console.log(
        `error in fetch with status code: ${resp.status}\non page: ${currentUrl}`
      );
      return pages;
    }

    const contentType = resp.headers.get("content-type");

    if (!contentType.includes("text/html")) {
      console.log(
        `non html response, content type: ${contentType}\non page: ${currentUrl}`
      );
      return pages;
    }

    const htmlBody = await resp.text();

    const nextUrls = getUrlsFromHtml(htmlBody, baseUrl);

    for (const nextUrl of nextUrls) {
      pages = await crawl(baseUrl, nextUrl, pages);
    }
  } catch (err) {
    console.log(`error in fetch: ${err.message}\non page: ${currentUrl}`);
  }
  return pages;
}

function normalizeUrl(url) {
  const urlObj = new URL(url);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

function getUrlsFromHtml(htmlBody, baseUrl) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");

  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      try {
        const urlObj = new URL(`${baseUrl}${linkElement.href}`);
        urls.push(urlObj.href);
      } catch (error) {
        console.log(`AQUI => ${baseUrl}${linkElement.href}`);

        console.log(`error with relative url: ${error.message}`);
      }
    } else {
      try {
        const urlObj = new URL(linkElement.href);
        urls.push(urlObj.href);
      } catch (error) {
        console.log(`AQUI => ${linkElement.href}`);

        console.log(`error with absolute url: ${error.message}`);
      }
    }
  }
  return urls;
}

module.exports = { crawl, normalizeUrl, getUrlsFromHtml };
