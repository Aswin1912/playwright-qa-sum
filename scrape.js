const { chromium } = require('playwright');

const seeds = [
  "https://sanand0.github.io/tdsdata/js_table/?seed=9",
  "https://sanand0.github.io/tdsdata/js_table/?seed=10",
  "https://sanand0.github.io/tdsdata/js_table/?seed=11",
  "https://sanand0.github.io/tdsdata/js_table/?seed=12",
  "https://sanand0.github.io/tdsdata/js_table/?seed=13",
  "https://sanand0.github.io/tdsdata/js_table/?seed=14",
  "https://sanand0.github.io/tdsdata/js_table/?seed=15",
  "https://sanand0.github.io/tdsdata/js_table/?seed=16",
  "https://sanand0.github.io/tdsdata/js_table/?seed=17",
  "https://sanand0.github.io/tdsdata/js_table/?seed=18"
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let grandTotal = 0;

  for (const url of seeds) {
    console.log(`Visiting: ${url}`);

    await page.goto(url, { waitUntil: "networkidle" });

    // IMPORTANT: wait for table to be rendered by JavaScript
    await page.waitForSelector("table");

    const numbers = await page.$$eval("table td", cells =>
      cells
        .map(cell => Number(cell.innerText.trim()))
        .filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Sum for page: ${sum}`);

    grandTotal += sum;
  }

  console.log("=================================");
  console.log("FINAL TOTAL:", grandTotal);
  console.log("=================================");

  await browser.close();
})();