const puppeteer = require('puppeteer-core');

async function launchBrowser() {
  return await puppeteer.launch({
    headless: true,
    executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome-stable',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
}

module.exports = { launchBrowser };
