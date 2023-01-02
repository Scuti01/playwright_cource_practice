import { test, expect } from '@playwright/test';

const searchField = '[name="q"]';

test.describe('GitHub - Search Result', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://github.com/');
  });

  test('should verify search result with valid repository name', async ({ page }) => {
    const firstSearchResultLink = '.repo-list li a';

    const keyword = 'playwright';
    const expectedLink = 'microsoft/playwright';

    await page.fill(searchField, keyword);
    await page.press(searchField, 'Enter');

    expect(await page.textContent(firstSearchResultLink)).toBe(expectedLink);
  });
});
