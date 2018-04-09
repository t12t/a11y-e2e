const puppeteer = require('puppeteer');

const url = 'https://www.w3.org/TR/wai-aria-practices-1.1/examples/disclosure/disclosure-faq.html'
const cButton = '.faq > dt > button';
const cContent = '.faq > dd > p';

const useBrowser = false;

let browser;
let page;
beforeAll(async () => {
  browser = await puppeteer.launch(
    useBrowser && {
      headless: false,
      slowMo: 100,
  });
  page = await browser.newPage();
  await page.goto(appUrlBase);
});

afterAll(() => {
  browser.close();
});

describe('Collapsible', () => {
  test('toggle-button is an actual button', async () => {
    const button = await page.$eval(cButton, el => el.nodeName);
    expect(button).toBe('BUTTON');
  });

  test.only('toggle content with click', async () => {
    await page.click(cButton);
    await page.waitForSelector(cContent, {hidden: false})
    await page.click(cButton);
    await page.waitForSelector(cContent, {hidden: true})
  });

  test('toggle content with enter', async () => {
    await page.focus(cButton);
    await page.keyboard.down('Enter');
    await page.waitForSelector(cContent, {hidden: false})
    await page.keyboard.down('Enter');
    await page.waitForSelector(cContent, {hidden: true})
  });

  test('toggle content with space', async () => {
    await page.focus(cButton);
    await page.keyboard.down('Space');
    await page.waitForSelector(cContent, {hidden: false})
    await page.keyboard.down('Space');
    await page.waitForSelector(cContent, {hidden: true})
  });

  test.only('set aria-expanded to true/false for expanded/collapsed with click', async () => {
    await page.click(cButton);
    const ariaClickButton = await page.$(cButton);
    const ariaClickExpanded = await page.evaluate((c) => {
      return c.getAttribute('aria-expanded');
    }, ariaClickButton);

    expect(ariaClickExpanded).toBe('true');

    await page.click(cButton);
    const ariaClickCollapsed = await page.evaluate((c) => {
      return c.getAttribute('aria-expanded');
    }, ariaClickButton);

    expect(ariaClickCollapsed).toBe('false');
  });

  test('set aria-expanded to true/false for expanded/collapsed with enter', async () => {
    await page.focus(cButton);
    await page.keyboard.press('Enter');
    const ariaEnterButton = await page.$(cButton);
    const ariaEnterExpanded = await page.evaluate((c) => {
      return c.getAttribute('aria-expanded');
    }, ariaEnterButton);

    expect(ariaEnterExpanded).toBe('true');

    await page.keyboard.press('Enter');
    const ariaEnterCollapsed = await page.evaluate((c) => {
      return c.getAttribute('aria-expanded');
    }, ariaEnterButton);

    expect(ariaEnterCollapsed).toBe('false');
  });

  test('set aria-expanded to true/false for expanded/collapsed with space', async () => {
    await page.focus(cButton);
    await page.keyboard.press('Space');
    const ariaSpaceButton = await page.$(cButton);
    const ariaSpaceExpanded = await page.evaluate((c) => {
      return c.getAttribute('aria-expanded');
    }, ariaSpaceButton);

    expect(ariaSpaceExpanded).toBe('true');

    await page.keyboard.press('Space');
    const ariaSpaceCollapsed = await page.evaluate((c) => {
      return c.getAttribute('aria-expanded');
    }, ariaSpaceButton);

    expect(ariaSpaceCollapsed).toBe('false');
  });
});
