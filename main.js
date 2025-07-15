const { crawl } = require("./crawl.js");

async function main() {
  if (process.argv.length < 3) {
    console.log("no URL provided");
    process.exit(1);
  }

  if (process.argv.length > 3) {
    console.log("too many urls provided");
    process.exit(1);
  }

  const url = process.argv[2];

  console.log("webcrawling started - " + url);
  const pages = await crawl(url, url, {});

  for (const page of Object.entries(pages)) {
    console.log(page);
  }
}

main();
