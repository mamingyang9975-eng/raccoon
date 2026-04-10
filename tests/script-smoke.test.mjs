import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

class Element {
  constructor(id = "") {
    this.id = id;
    this.textContent = "";
    this._innerHTML = "";
    this.disabled = false;
    this.value = "";
    this.src = "";
    this.onclick = null;
    this.children = [];
    this.style = {};
    this.className = "";
    this.classList = {
      add() {},
      remove() {},
    };
  }

  get innerHTML() {
    return this._innerHTML;
  }

  set innerHTML(value) {
    this._innerHTML = value;
    if (value === "") this.children = [];
  }

  appendChild(child) {
    this.children.push(child);
  }
}

test("script.js can render the result screen in a minimal DOM", async () => {
  const ids = [
    "start-screen",
    "quiz-screen",
    "result-screen",
    "start-btn",
    "prev-btn",
    "next-btn",
    "copy-btn",
    "restart-btn",
    "progress-current",
    "progress-total",
    "progress-fill",
    "scene-pill",
    "question-title",
    "question-text",
    "options",
    "ai-status",
    "result-title",
    "result-verdict",
    "result-recap",
    "result-talents",
    "result-traps",
    "result-manual",
    "result-quest",
    "raccoon-avatar",
  ];

  const elements = Object.fromEntries(ids.map((id) => [id, new Element(id)]));
  const context = {
    console,
    localStorage: {
      getItem() {
        return null;
      },
      setItem() {},
    },
    navigator: {
      clipboard: {
        writeText: async () => {},
      },
    },
    setTimeout,
    clearTimeout,
    fetch: async () =>
      new Response(
        JSON.stringify({
          model: "qwen/qwen-2.5-7b-instruct:free",
          content: JSON.stringify({
            verdict: "AI verdict",
            story_recap: "AI story",
            talents: ["a", "b"],
            traps: ["c", "d"],
            relationship_manual: ["e", "f"],
            tonight_quest: "g",
          }),
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      ),
    document: {
      getElementById(id) {
        return elements[id] || null;
      },
      createElement(tag) {
        return new Element(tag);
      },
    },
  };

  context.window = context;
  vm.createContext(context);
  vm.runInContext(readFileSync(new URL("../script.js", import.meta.url), "utf8"), context);
  vm.runInContext("state.answers = new Array(QUESTIONS.length).fill(0); renderResult();", context);
  await new Promise((resolve) => setTimeout(resolve, 0));

  assert.equal(elements["result-title"].textContent, "夜行观察员");
  assert.match(elements["raccoon-avatar"].src, /\/api\/avatar\?title=/);
  assert.equal(elements["result-verdict"].textContent, "AI verdict");
  assert.equal(elements["result-quest"].textContent, "g");
  assert.equal(
    elements["ai-status"].textContent,
    "AI 报告已自动生成。 当前模型：qwen/qwen-2.5-7b-instruct:free"
  );
});

test("script.js can recover JSON embedded in extra model text", async () => {
  const ids = [
    "start-screen",
    "quiz-screen",
    "result-screen",
    "start-btn",
    "prev-btn",
    "next-btn",
    "copy-btn",
    "restart-btn",
    "progress-current",
    "progress-total",
    "progress-fill",
    "scene-pill",
    "question-title",
    "question-text",
    "options",
    "ai-status",
    "result-title",
    "result-verdict",
    "result-recap",
    "result-talents",
    "result-traps",
    "result-manual",
    "result-quest",
    "raccoon-avatar",
  ];

  const elements = Object.fromEntries(ids.map((id) => [id, new Element(id)]));
  const context = {
    console,
    localStorage: {
      getItem() {
        return null;
      },
      setItem() {},
    },
    navigator: {
      clipboard: {
        writeText: async () => {},
      },
    },
    setTimeout,
    clearTimeout,
    fetch: async () =>
      new Response(
        JSON.stringify({
          model: "openrouter/free",
          content: [
            "下面是结果：",
            "```json",
            JSON.stringify({
              verdict: "Recovered verdict",
              story_recap: "Recovered story",
              talents: ["a", "b"],
              traps: ["c", "d"],
              relationship_manual: ["e", "f"],
              tonight_quest: "Recovered quest",
            }),
            "```",
            "祝你今天好运。",
          ].join("\n"),
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      ),
    document: {
      getElementById(id) {
        return elements[id] || null;
      },
      createElement(tag) {
        return new Element(tag);
      },
    },
  };

  context.window = context;
  vm.createContext(context);
  vm.runInContext(readFileSync(new URL("../script.js", import.meta.url), "utf8"), context);
  vm.runInContext("state.answers = new Array(QUESTIONS.length).fill(0); renderResult();", context);
  await new Promise((resolve) => setTimeout(resolve, 0));

  assert.equal(elements["result-verdict"].textContent, "Recovered verdict");
  assert.equal(elements["result-quest"].textContent, "Recovered quest");
  assert.equal(
    elements["ai-status"].textContent,
    "AI 报告已自动生成。 当前模型：openrouter/free"
  );
});

test("script.js can normalize alternate AI field names and nested payloads", async () => {
  const ids = [
    "start-screen",
    "quiz-screen",
    "result-screen",
    "start-btn",
    "prev-btn",
    "next-btn",
    "copy-btn",
    "restart-btn",
    "progress-current",
    "progress-total",
    "progress-fill",
    "scene-pill",
    "question-title",
    "question-text",
    "options",
    "ai-status",
    "result-title",
    "result-verdict",
    "result-recap",
    "result-talents",
    "result-traps",
    "result-manual",
    "result-quest",
    "raccoon-avatar",
  ];

  const elements = Object.fromEntries(ids.map((id) => [id, new Element(id)]));
  const context = {
    console,
    localStorage: {
      getItem() {
        return null;
      },
      setItem() {},
    },
    navigator: {
      clipboard: {
        writeText: async () => {},
      },
    },
    setTimeout,
    clearTimeout,
    fetch: async () =>
      new Response(
        JSON.stringify({
          model: "liquid/lfm-2.5-1.2b-instruct-20260120:free",
          content: JSON.stringify({
            report: {
              summary: "Nested verdict",
              narrative: "Nested recap",
              strengths: ["s1", "s2"],
              risks: ["r1", "r2"],
              advice: ["a1", "a2"],
              action: "Nested quest",
            },
          }),
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      ),
    document: {
      getElementById(id) {
        return elements[id] || null;
      },
      createElement(tag) {
        return new Element(tag);
      },
    },
  };

  context.window = context;
  vm.createContext(context);
  vm.runInContext(readFileSync(new URL("../script.js", import.meta.url), "utf8"), context);
  vm.runInContext("state.answers = new Array(QUESTIONS.length).fill(0); renderResult();", context);
  await new Promise((resolve) => setTimeout(resolve, 0));

  assert.equal(elements["result-verdict"].textContent, "Nested verdict");
  assert.equal(elements["result-recap"].textContent, "Nested recap");
  assert.equal(elements["result-quest"].textContent, "Nested quest");
  assert.equal(elements["result-talents"].children.length, 2);
  assert.equal(elements["result-traps"].children.length, 2);
  assert.equal(elements["result-manual"].children.length, 2);
});
