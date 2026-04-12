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

const DOM_IDS = [
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
  "radar-chart",
  "result-spotlight",
  "result-contrast",
  "result-dimension-bars",
  "result-subtitles",
  "result-title",
  "result-verdict",
  "result-recap",
  "result-talents",
  "result-traps",
  "result-manual",
  "result-quest",
  "raccoon-avatar",
];

function loadScriptContext() {
  const elements = Object.fromEntries(DOM_IDS.map((id) => [id, new Element(id)]));
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
          model: "test/free",
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
  return { context, elements };
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
    "radar-chart",
    "result-spotlight",
    "result-contrast",
    "result-dimension-bars",
    "result-subtitles",
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

  assert.equal(elements["result-title"].textContent, "行动派社交发动机");
  assert.match(elements["raccoon-avatar"].src, /\/api\/avatar\?title=/);
  assert.ok(elements["result-subtitles"].children.length >= 2);
  assert.match(elements["result-verdict"].textContent, /不太一样/);
  assert.match(elements["result-recap"].textContent, /先判断哪条路线最安全/);
  assert.match(elements["radar-chart"].innerHTML, /<svg/);
  assert.match(elements["radar-chart"].innerHTML, /体面/);
  assert.equal(elements["result-spotlight"].children.length, 3);
  assert.equal(elements["result-contrast"].children.length, 3);
  assert.equal(elements["result-dimension-bars"].children.length, 6);
  assert.ok(elements["ai-status"].textContent.length > 0);
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
    "radar-chart",
    "result-spotlight",
    "result-contrast",
    "result-dimension-bars",
    "result-subtitles",
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

  assert.equal(elements["result-title"].textContent, "精致崩溃艺术家");
  assert.ok(elements["result-subtitles"].children.length >= 2);
  assert.match(elements["result-recap"].textContent, /回个玩笑，轻轻带过/);
  assert.match(elements["radar-chart"].innerHTML, /<svg/);
  assert.equal(elements["result-dimension-bars"].children.length, 6);
  assert.ok(elements["ai-status"].textContent.length > 0);
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
    "radar-chart",
    "result-spotlight",
    "result-contrast",
    "result-dimension-bars",
    "result-subtitles",
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

  assert.equal(elements["result-title"].textContent, "浪漫废墟建筑师");
  assert.ok(elements["result-subtitles"].children.length >= 2);
  assert.match(elements["result-recap"].textContent, /先躲进灌木，等等再说/);
  assert.match(elements["radar-chart"].innerHTML, /<svg/);
  assert.equal(elements["result-contrast"].children.length, 3);
  assert.ok(elements["ai-status"].textContent.length > 0);
  assert.equal(elements["ai-report"].children.length, 1);
  assert.match(elements["ai-report"].children[0].textContent, /浣熊/);
  assert.ok(elements["result-talents"].children.length >= 2);
  assert.ok(elements["result-traps"].children.length >= 2);
  assert.ok(elements["result-manual"].children.length >= 2);
});

test("script.js does not fall back to the default title for any top-dimension pair", () => {
  const { context } = loadScriptContext();
  const missingPairs = vm.runInContext(
    `(() => {
      const missing = [];
      for (let i = 0; i < DIMS.length; i += 1) {
        for (let j = i + 1; j < DIMS.length; j += 1) {
          const scores = Object.fromEntries(DIMS.map((dim) => [dim, 0]));
          scores[DIMS[i]] = 10;
          scores[DIMS[j]] = 9;
          if (titleFromScores(scores) === "城市夜行观察员") {
            missing.push(canonicalPairKey(DIMS[i], DIMS[j]));
          }
        }
      }
      return JSON.stringify(missing);
    })()`,
    context
  );

  assert.equal(missingPairs, "[]");
});

test("script.js keeps the recap question mapped to AVOID instead of an unknown dimension", () => {
  const { context } = loadScriptContext();
  const effect = vm.runInContext("QUESTIONS[21][2][2][1]", context);

  assert.equal(effect.AVOID, 2);
  assert.equal(effect.DRAMA, 1);
  assert.equal("OID" in effect, false);
});
