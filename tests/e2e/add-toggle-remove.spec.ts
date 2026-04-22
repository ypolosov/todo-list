import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
});

test('add, toggle, remove and persistence across reload', async ({ page }) => {
  await expect(page.getByRole('heading', { name: /todo-list/i })).toBeVisible();
  await expect(page.getByText(/no tasks/i)).toBeVisible();

  await page.getByPlaceholder('new task').fill('buy milk');
  await page.getByRole('button', { name: /^add$/i }).click();
  await expect(page.getByText('buy milk')).toBeVisible();

  const checkbox = page.getByRole('checkbox');
  await expect(checkbox).not.toBeChecked();
  await checkbox.click();
  await expect(page.getByRole('checkbox')).toBeChecked();

  await page.reload();
  await expect(page.getByText('buy milk')).toBeVisible();
  await expect(page.getByRole('checkbox')).toBeChecked();

  await page.getByRole('button', { name: /^remove$/i }).click();
  await expect(page.getByText(/no tasks/i)).toBeVisible();

  await page.reload();
  await expect(page.getByText(/no tasks/i)).toBeVisible();
});
