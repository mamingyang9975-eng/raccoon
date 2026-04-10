# raccoon
test
redeploy test
# 浣熊今天怎么活（免费部署版）

一个故事化人格测试网页，支持本地规则报告 

## 本地运行

```bash
python -m http.server 4173
```

打开 `http://127.0.0.1:4173`。

## 免费上线（Cloudflare Pages + Functions）

1. 把项目推送到 GitHub。
2. Cloudflare Dashboard -> Pages -> Create a project -> 选择该仓库。
3. 构建设置：
   - Framework preset: `None`
   - Build command: 留空
   - Build output directory: 留空
4. 在 Pages 项目设置 -> Environment variables 增加：
   - `OPENROUTER_API_KEY` = 你的 OpenRouter Key
   - `OPENROUTER_MODEL` = `meta-llama/llama-3.3-8b-instruct:free`（可改）
   - `SITE_URL` = 你的 Pages 域名（可选）
5. 重新部署。

部署后前端默认请求 `/api/report`，由 `functions/api/report.js` 代理到 OpenRouter 免费模型。
