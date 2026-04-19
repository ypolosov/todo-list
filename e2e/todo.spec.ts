import { test, expect } from '@playwright/test';

test('сквозной сценарий: добавить, отметить, отфильтровать, удалить', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /todo/i })).toBeVisible();

  await page.getByRole('textbox').fill('купить хлеб');
  await page.getByRole('button', { name: /добавить/i }).click();

  await page.getByRole('textbox').fill('помыть посуду');
  await page.getByRole('button', { name: /добавить/i }).click();

  await expect(page.getByText('купить хлеб')).toBeVisible();
  await expect(page.getByText('помыть посуду')).toBeVisible();

  await page.getByRole('checkbox').first().check();
  await expect(page.getByRole('checkbox').first()).toBeChecked();

  await page.getByRole('button', { name: /^активные/i }).click();
  await expect(page.getByText('купить хлеб')).toBeHidden();
  await expect(page.getByText('помыть посуду')).toBeVisible();

  await page.getByRole('button', { name: /^все/i }).click();
  await page.getByRole('button', { name: /удалить задачу купить хлеб/i }).click();
  await expect(page.getByText('купить хлеб')).toBeHidden();
});
