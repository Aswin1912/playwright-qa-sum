const { chromium } = require('playwright');

const seeds = [
  "https://<real-domain>/seed9",
  "https://<real-domain>/seed10",
  "https://<real-domain>/seed11",
  "https://<real-domain>/seed12",
  "https://<real-domain>/seed13",
  "https://<real-domain>/seed14",
  "https://<real-domain>/seed15",
  "https://<real-domain>/seed16",
  "https://<real-domain>/seed17",
  "https://<real-domain>/seed18"
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