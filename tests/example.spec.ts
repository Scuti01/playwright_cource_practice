import { expect } from 'chai';
import { chromium } from '@playwright/test';


describe('test test', async () => {

  let page, browser, context

  beforeEach(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage('https://www.headlesstesting.com/');
})

  afterEach(async function() {
    await page.screenshot({ path: `${this.currentTest.title.replace(/\s+/g, '_')}.png` })
    await browser.close()
})

  it('checks the title of the page', async () => {
  
    await page.goto('https://www.headlesstesting.com/');
    const title = await page.title();
    expect(title).to.equal("TestingBot: Cross Browser Testing and Mobile App Testing");
  })
})
