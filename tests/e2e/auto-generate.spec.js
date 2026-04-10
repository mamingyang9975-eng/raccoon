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

  await expect(page.locator("#radar-chart svg")).toBeVisible();
  await expect(page.locator("#radar-chart")).toContainText("体面");
  await expect(page.locator("#ai-status")).not.toBeEmpty();
  await expect(page.locator("#ai-report")).not.toBeEmpty();
  await expect(page.locator("#ai-report")).toContainText("浣熊");
  await expect(page.locator("#result-talents li")).toHaveCount(3);
  await expect(page.locator("#result-traps li")).toHaveCount(2);
  await expect(page.locator("#result-manual li")).toHaveCount(3);
});

test("different answer patterns receive different local deep reports", async ({ page }) => {
  await finishQuiz(page, 0);
  const firstReport = await page.locator("#ai-report").textContent();
  const firstChart = await page.locator("#radar-chart").innerHTML();

  await page.getByRole("button", { name: "再测一次" }).click();
  await page.getByRole("button", { name: "开始今天的剧情" }).click();

  for (let i = 0; i < 24; i += 1) {
    await page.locator("#options .option").nth(1).click();
    await page.getByRole("button", { name: i === 23 ? "查看结果" : "下一题" }).click();
  }

  const secondReport = await page.locator("#ai-report").textContent();
  const secondChart = await page.locator("#radar-chart").innerHTML();
  await expect(page.locator("#ai-status")).not.toBeEmpty();
  expect(firstReport).not.toEqual(secondReport);
  expect(firstChart).not.toEqual(secondChart);
});
