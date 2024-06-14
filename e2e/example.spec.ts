import { test, expect } from '@playwright/test';

test.describe('calculatrice', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
  });

  test('button "=" should have background color #ff0000', async ({ page }) => {
    const backgroundColor = await page.getByRole('button', { name: '=' }).evaluate(node => window.getComputedStyle(node).backgroundColor);
    expect(backgroundColor).toBe('rgb(255, 0, 0)');
  });

  test('button "=" should contain class "red"', async ({ page }) => {
    await expect(page.getByRole('button', { name: '=' }).getAttribute('class')).toContain('red');
  });

  test('div.screen should display 0 on page load', async ({ page }) => {
    await expect(page.locator('.screen')).toHaveText('0');
  });
});