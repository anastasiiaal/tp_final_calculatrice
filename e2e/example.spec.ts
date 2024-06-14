import { test, expect } from '@playwright/test';

test.describe('calculatrice', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
  });

  test('div.screen == 0 on load', async ({ page }) => {
    await expect(page.locator('.screen')).toHaveText('0');
  });

  test('button "=" should have background color #ff0000', async ({ page }) => {
    const backgroundColor = await page.getByRole('button', { name: '=' }).evaluate(node => window.getComputedStyle(node).backgroundColor);
    expect(backgroundColor).toBe('rgb(255, 0, 0)');
  });
});