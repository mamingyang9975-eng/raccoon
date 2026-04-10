import { expect, test } from "@playwright/test";

async function finishQuiz(page, optionIndex = 0) {
  await page.goto("/");
  await page.getByRole("button", { name: "开始今天的剧情" }).click();

  for (let i = 0; i < 24; i += 1) {
    await page.locator("#options .option").nth(optionIndex).click();
    await page.getByRole("button", { name: i === 23 ? "查看结果" : "下一题" }).click();
  }
}

test("local deep report is rendered directly on the result screen", async ({ page }) => {
  await finishQuiz(page, 0);

  await expect(page.locator("#ai-status")).toContainText("深度解读已载入：");
  await expect(page.locator("#ai-report")).not.toBeEmpty();
  await expect(page.locator("#ai-report")).toContainText("浣熊");
  await expect(page.locator("#result-talents li")).toHaveCount(3);
  await expect(page.locator("#result-traps li")).toHaveCount(2);
  await expect(page.locator("#result-manual li")).toHaveCount(3);
});

test("different answer patterns receive different local deep reports", async ({ page }) => {
  await finishQuiz(page, 0);
  const firstReport = await page.locator("#ai-report").textContent();

  await page.getByRole("button", { name: "再测一次" }).click();
  await page.getByRole("button", { name: "开始今天的剧情" }).click();

  for (let i = 0; i < 24; i += 1) {
    await page.locator("#options .option").nth(1).click();
    await page.getByRole("button", { name: i === 23 ? "查看结果" : "下一题" }).click();
  }

  const secondReport = await page.locator("#ai-report").textContent();
  await expect(page.locator("#ai-status")).toContainText("深度解读已载入：");
  expect(firstReport).not.toEqual(secondReport);
});
