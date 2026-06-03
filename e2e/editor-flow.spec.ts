import { expect, test } from '@playwright/test'

const STORAGE_KEY = 'todos:text'
const TODO_TEXT = ['买菜', '写代码', '', '读书'].join('\n')

test('edits, persists after refresh, and clears after confirmation', async ({
  page,
}) => {
  await page.goto('/')

  const editor = page.getByLabel('待办文本')
  await editor.fill(TODO_TEXT)

  await expect(page.getByText('3 条待办')).toBeVisible()
  await expect
    .poll(() => page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY))
    .toBe(TODO_TEXT)

  await page.reload()

  await expect(page.getByLabel('待办文本')).toHaveValue(TODO_TEXT)
  await expect(page.getByText('3 条待办')).toBeVisible()

  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toContain('清空')
    await dialog.accept()
  })

  await page.getByRole('button', { name: '清空' }).click()

  await expect(page.getByLabel('待办文本')).toHaveValue('')
  await expect(page.getByText('0 条待办')).toBeVisible()
  await expect
    .poll(() => page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY))
    .toBe('')
})
