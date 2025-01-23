import puppeteer from 'puppeteer';
import crypto from 'crypto';

(async () => {
  const uuid = crypto.randomUUID();
  try {
    console.log('Setting up browser...');
    const browser = await puppeteer.launch({
      timeout: 0,
      protocolTimeout: 0,
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ]
    });
    const page = await browser.newPage();

    const size = 3000;
    const dimensions = {
      width: 2 * size,
      height: size
    };

    console.log('Setting viewport...');
    await page.setViewport(dimensions);

    console.log('Navigating to page...');
    await page.goto('http://localhost:3000/', {
      waitUntil: 'networkidle2'
    });

    console.log('Capturing screenshot...');
    await page.screenshot({
      path: `screenshots/${dimensions.width}x${dimensions.height}_${uuid}.png`,
      fullPage: true
    });

    console.log('Closing browser...');
    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();
