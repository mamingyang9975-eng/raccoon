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
    "ai-report",
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
  assert.match(elements["result-verdict"].textContent, /你是「/);
  assert.match(elements["ai-status"].textContent, /^深度解读已载入：/);
  assert.equal(elements["ai-report"].children.length, 1);
  assert.match(elements["ai-report"].children[0].textContent, /浣熊/);
});

test("script.js can render a different local deep report for another answer pattern", async () => {
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
    "ai-report",
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
  vm.runInContext("state.answers = new Array(QUESTIONS.length).fill(1); renderResult();", context);
  await new Promise((resolve) => setTimeout(resolve, 0));

  assert.match(elements["ai-status"].textContent, /^深度解读已载入：/);
  assert.equal(elements["ai-report"].children.length, 1);
  assert.match(elements["ai-report"].children[0].textContent, /浣熊/);
  assert.notEqual(elements["ai-report"].children[0].textContent, "");
});

test("script.js can render a local deep report for a third answer pattern", async () => {
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
    "ai-report",
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
  vm.runInContext("state.answers = new Array(QUESTIONS.length).fill(2); renderResult();", context);
  await new Promise((resolve) => setTimeout(resolve, 0));

  assert.match(elements["ai-status"].textContent, /^深度解读已载入：/);
  assert.equal(elements["ai-report"].children.length, 1);
  assert.match(elements["ai-report"].children[0].textContent, /浣熊/);
  assert.ok(elements["result-talents"].children.length >= 2);
  assert.ok(elements["result-traps"].children.length >= 2);
  assert.ok(elements["result-manual"].children.length >= 2);
});
