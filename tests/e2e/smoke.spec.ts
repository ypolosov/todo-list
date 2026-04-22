import { expect, test } from '@playwright/test';

test.describe('TODO smoke', () => {
  test('add → toggle → reload persists → remove → filter', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.localStorage.clear());
    await page.reload();

    await page.getByLabel('Новая задача').fill('купить хлеб');
    await page.getByRole('button', { name: 'Add' }).click();

    const list = page.getByRole('list', { name: 'tasks' });
    await expect(list.locator('[data-task-id]')).toHaveCount(1);
    await expect(list.locator('[data-status="active"]')).toHaveCount(1);

    await page.getByRole('checkbox', { name: 'toggle-купить хлеб' }).check();
    await expect(list.locator('[data-status="completed"]')).toHaveCount(1);

    await page.reload();
    await expect(list.locator('[data-status="completed"]')).toHaveCount(1);
    await expect(list.locator('[data-task-id]')).toHaveText(/купить хлеб/);

    await page.getByRole('button', { name: 'active', exact: true }).click();
    await expect(list.locator('[data-empty]')).toBeVisible();

    await page.getByRole('button', { name: 'completed', exact: true }).click();
    await expect(list.locator('[data-task-id]')).toHaveCount(1);

    await page.getByRole('button', { name: 'all', exact: true }).click();
    await page.getByRole('button', { name: 'remove-купить хлеб' }).click();
    await expect(list.locator('[data-task-id]')).toHaveCount(0);
    await expect(list.locator('[data-empty]')).toBeVisible();
  });
});
