const { chromium } = require('playwright');

const seeds = [
  "SEED_9_URL",
  "SEED_10_URL",
  "SEED_11_URL",
  "SEED_12_URL",
  "SEED_13_URL",
  "SEED_14_URL",
  "SEED_15_URL",
  "SEED_16_URL",
  "SEED_17_URL",
  "SEED_18_URL"
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (const url of seeds) {
    console.log(`Visiting: ${url}`);
    await page.goto(url);

    const numbers = await page.$$eval('table td', cells =>
      cells
        .map(cell => Number(cell.innerText.trim()))
        .filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a, b) => a + b, 0);
    grandTotal += sum;
  }

  console.log("=================================");
  console.log("FINAL TOTAL:", grandTotal);
  console.log("=================================");

  await browser.close();
})();