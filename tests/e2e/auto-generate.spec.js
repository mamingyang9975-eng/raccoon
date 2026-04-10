import { expect, test } from "@playwright/test";

async function finishQuiz(page) {
  await page.goto("/");
  await page.getByRole("button", { name: "开始今天的剧情" }).click();

  for (let i = 0; i < 24; i += 1) {
    await page.locator("#options .option").first().click();
    await page.getByRole("button", { name: i === 23 ? "查看结果" : "下一题" }).click();
  }
}

test("auto generation fills the result screen with normalized AI content", async ({ page }) => {
  await page.route("**/api/report", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        model: "liquid/lfm-2.5-1.2b-instruct-20260120:free",
        content: JSON.stringify({
          report: {
            summary: "这是浏览器测试判词",
            narrative: "这是浏览器测试剧情回放",
            strengths: ["反应快", "点子多"],
            risks: ["容易分心", "容易嘴硬"],
            advice: ["先做一件小事", "今天少脑补一点"],
            action: "今晚去认真吃顿饭",
          },
        }),
      }),
    });
  });

  await finishQuiz(page);

  await expect(page.locator("#ai-status")).toContainText("AI 报告已自动生成。");
  await expect(page.locator("#result-verdict")).toHaveText("这是浏览器测试判词");
  await expect(page.locator("#result-recap")).toHaveText("这是浏览器测试剧情回放");
  await expect(page.locator("#result-talents li")).toHaveCount(2);
  await expect(page.locator("#result-traps li")).toHaveCount(2);
  await expect(page.locator("#result-manual li")).toHaveCount(2);
  await expect(page.locator("#result-quest")).toHaveText("今晚去认真吃顿饭");
});

test("auto generation stops waiting and shows a timeout error", async ({ page }) => {
  await page.addInitScript(() => {
    window.__AI_REQUEST_TIMEOUT_MS__ = 400;
  });

  await page.route("**/api/report", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    try {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          model: "openrouter/free",
          content: JSON.stringify({ verdict: "late" }),
        }),
      });
    } catch {
      // The browser may abort the request before this delayed response is sent.
    }
  });

  await finishQuiz(page);

  await expect(page.locator("#ai-status")).toContainText("自动生成失败：AI 请求超时");
});
