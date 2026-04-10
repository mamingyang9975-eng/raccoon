const QUESTIONS = [
  ["下水道醒来", "你被井盖缝里漏下来的阳光晃醒。今天第一反应是：", [
    ["查一下今天的工作计划", { DO: 2, SAFE: 1 }],
    ["先刷会儿人类短视频，等灵感上线", { AVOID: 2, DRAMA: 1 }],
    ["os：一直躺在床上会不会死", { DRAMA: 2, DO: -1 }]
  ]],
  ["下水道醒来", "走到门口，你闻到三种味道，可能是食物。你会：", [
    ["先判断哪条路线最安全", { SAFE: 2, DO: 1 }],
    ["跟着最香的走，机不可失", { DRAMA: 1, SAFE: -1, DO: 1 }],
    ["还是再等等，静观其变", { AVOID: 2, DO: -1 }]
  ]],
  ["下水道醒来", "路过水洼看到自己倒影，你会：", [
    ["整理毛发，体面是基本盘", { MASK: 2, SAFE: 1 }],
    ["自拍一张发朋友圈", { MASK: 1, SOCIAL: 1, DRAMA: 1 }],
    ["无所谓什么样，每天都一样", { SAFE: 2, MASK: -1 }]
  ]],
  ["觅食时段", "第一站是便利店后门，垃圾袋已上线。你会：", [
    ["按老规矩高热量、低风险", { SAFE: 2, DO: 1 }],
    ["今天想吃点新鲜的，赌一把网红店后厨", { DRAMA: 1, SAFE: -1 }],
    ["在隐蔽的地方随便捡一点", { AVOID: 2, DO: -1 }]
  ]],
  ["觅食时段", "你发现一块完整三明治，同时听到脚步声。你会：", [
    ["秒叼就跑，执行大于犹豫", { DO: 2, SAFE: 1 }],
    ["卖萌可耻但有用", { MASK: 1, SAFE: 2 }],
    ["放弃这口，告诉自己‘我值得更好的’", { DRAMA: 2, AVOID: 1 }]
  ]],
  ["觅食时段", "吃到一半，另一只浣熊盯着你看。你会：", [
    ["分他一点，做熊留一线", { SOCIAL: 2, SAFE: 1 }],
    ["先聊两句试探，再决定分不分", { SOCIAL: 1, MASK: 1 }],
    ["护食后退，避免复杂关系", { SAFE: 1, SOCIAL: -1, AVOID: 1 }]
  ]],
  ["街区社交", "老友邀你加入‘今晚整活小队’。你会：", [
    ["冲！熊多，事就有戏！", { SOCIAL: 2, DRAMA: 1 }],
    ["看成员名单再决定", { SAFE: 2, MASK: 1 }],
    ["已读不回，睡觉梳毛才是正事", { AVOID: 2, MASK: 1, SOCIAL: -1 }]
  ]],
  ["街区社交", "群里讨论路线吵起来了。你通常：", [
    ["出来定调，直接拍板", { DO: 2, SOCIAL: 1 }],
    ["发个‘都可以’维持和气", { MASK: 1, AVOID: 1 }],
    ["围观并截图精彩片段", { AVOID: 2, DRAMA: 1 }]
  ]],
  ["街区社交", "路边碰见流浪猫，对方气场很强。你会：", [
    ["主动打招呼，兄弟气色真好", { SOCIAL: 2, MASK: 1 }],
    ["今天太阳真好，小猫咪也是一只小猫咪", { SAFE: 1, MASK: 1 }],
    ["默默走进草丛，然后脑补一段宿命对手戏", { DRAMA: 2, DO: -1 }]
  ]],
  ["公园职业发展", "你听说公园垃圾桶要‘区域承包’。你会：", [
    ["立刻踩点——我要承包这里", { DO: 2, SAFE: 1 }],
    ["找人问问内幕", { SOCIAL: 2, MASK: 1 }],
    ["暂时观望，等风向明确", { SAFE: 1, AVOID: 1 }]
  ]],
  ["公园职业发展", "队友提议‘搞个品牌：城市清道夫’。你会：", [
    ["霸气！名字要响，人设要稳", { MASK: 2, SOCIAL: 1 }],
    ["先算收益，不做无效包装", { SAFE: 2, DO: 1 }],
    ["不如去公园整点薯条", { DRAMA: 2, DO: 1 }]
  ]],
  ["公园职业发展", "试运营第一天，效果一般。你倾向：", [
    ["正常情况，复盘问题明天优化", { DO: 2, SAFE: 1 }],
    ["发条动态展示进度，配文：我们在路上", { MASK: 2, DRAMA: 1 }],
    ["我要认真了", { DRAMA: 2, AVOID: 1 }]
  ]],
  ["感情支线", "路灯下你遇到一只很会说话的浣熊小未。你会：", [
    ["快速找出话题", { SOCIAL: 2, DRAMA: 1 }],
    ["保持礼貌距离，熊还是习惯慢慢来", { SAFE: 2, MASK: 1 }],
    ["内心想了N件事，话只说了三句", { DRAMA: 2, AVOID: 1 }]
  ]],
  ["感情支线", "聊天中途你思绪飘远，小未问你‘你在想什么’。你会：", [
    ["坦白自己走神", { DO: 1, SOCIAL: 1, MASK: -1 }],
    ["回个玩笑，轻轻带过", { MASK: 2, AVOID: 1 }],
    ["转移话题聊天气和垃圾分类", { AVOID: 2, SAFE: 1 }]
  ]],
  ["感情支线", "分别时，对方说‘改天见’。你会：", [
    ["当晚发消息，明确下一次", { DO: 2, SOCIAL: 1 }],
    ["下次的事情下次再说", { MASK: 2, SAFE: 1 }],
    ["开始想象下一次见面，但是并不出门", { DRAMA: 2, AVOID: 2 }]
  ]],
  ["自我娱乐", "夜深了，你打开人类论坛：", [
    ["搜索‘塔罗一周运势解读’", { DO: 1, DRAMA: 1 }],
    ["看别人吵架并点赞高赞阴阳", { AVOID: 1, DRAMA: 2 }],
    ["（已睡着）", { MASK:1, DO: 2 }]
  ]],
  ["自我娱乐", "朋友发来‘来打游戏’。你会：", [
    ["立马加入", { SOCIAL: 2, DRAMA: 1 }],
    ["先把手头事做完再玩", { DO: 2, SAFE: 1 }],
    ["说太忙了，然后继续刷帖子", { AVOID: 2, MASK: 1 }]
  ]],
  ["自我娱乐", "你突然想学新技能（开锁/跑酷/烹饪）。你会：", [
    ["立刻找教程开学", { DO: 2 }],
    ["先买装备，仪式感到位", { MASK: 1, DRAMA: 1, DO: -1 }],
    ["畅想一通后继续晒太阳", { DRAMA: 2, AVOID: 1 }]
  ]],
  ["危机追逐", "你被手电照到，保安开始追。你会：", [
    ["按预设路线撤离", { SAFE: 2, DO: 1 }],
    ["临场走位，见缝插针", { DRAMA: 1, DO: 1, SAFE: -1 }],
    ["先躲进灌木，等等再说", { AVOID: 2, SAFE: 1 }]
  ]],
  ["危机追逐", "逃跑中队友摔了一跤，回头救不救？", [
    ["回头拉他一把", { SOCIAL: 2, DO: 1 }],
    ["还是先确保自己安全再接应", { SAFE: 2, DO: 1 }],
    ["默念‘各安天命’", { AVOID: 2, MASK: 1, SOCIAL: -1 }]
  ]],
  ["危机追逐", "安全后大家复盘，你会：", [
    ["整理问题，制定下次方案", { DO: 2, SAFE: 1 }],
    ["讲成传奇故事，提升士气", { DRAMA: 2, SOCIAL: 1 }],
    ["都过去了，不用复盘", { AVOID: 2 }]
  ]],
  ["天亮前总结", "凌晨四点，你准备写‘今日总结’。你会：", [
    ["写三条做得好的、两条要改的", { DO: 2, SAFE: 1 }],
    ["写下对这一天的感受", { MASK: 1, DRAMA: 2 }],
    ["想了很久，不知道写什么，最后只写了个句号", { OID: 2, DRAMA: 1 }]
  ]],
  ["天亮前总结", "明天最想改变的一件事是：", [
    ["少想一点，先做一点", { DO: 2, AVOID: -1 }],
    ["把关系维护得更体面", { MASK: 2, SOCIAL: 1 }],
    ["希望命运自己好起来", { AVOID: 2, DRAMA: 1 }]
  ]],
  ["天亮前总结", "你躺回纸箱前，在心里想：", [
    ["明天干点什么呢", { SAFE: 1, DO: 1 }],
    ["电影般的平静一天…", { DRAMA: 2 }],
    ["今天的事情明天再说", { AVOID: 2, SAFE: 1 }]
  ]]
 ];
const DIMS = ["MASK", "SAFE", "SOCIAL", "AVOID", "DRAMA", "DO"];

const TITLE_MAP = {
  "MASK+SAFE": "体面生存架构师",
  "MASK+AVOID": "战术性失踪总监",
  "MASK+DRAMA": "精致崩溃艺术家",
  "SAFE+DO": "稳健推进工程师",
  "SAFE+AVOID": "风险规避型观察员",
  "SAFE+SOCIAL": "礼貌联盟协调员",
  "SOCIAL+DRAMA": "夜间气氛组组长",
  "SOCIAL+DO": "行动派社交发动机",
  "SOCIAL+AVOID": "间歇性热闹选手",
  "DRAMA+AVOID": "浪漫废墟建筑师",
  "DRAMA+DO": "理想主义执行官",
  "AVOID+DO": "最后一刻逆袭者"
};

const SUB_TITLES = [
  { when: s => s.MASK >= 10, text: "人设维护大师" },
  { when: s => s.SAFE >= 10, text: "稳字当头派" },
  { when: s => s.SOCIAL >= 10, text: "人类Wi-Fi浣熊版" },
  { when: s => s.AVOID >= 10, text: "明日再议委员会" },
  { when: s => s.DRAMA >= 10, text: "情绪电影导演" },
  { when: s => s.DO >= 10, text: "先做再说执行者" },
  { when: s => s.DO <= 2 && s.AVOID >= 8, text: "计划表收藏家" },
  { when: s => s.SOCIAL <= 2 && s.MASK >= 8, text: "礼貌潜水艇" }
];

/* =========================
 * 3) 状态 & DOM
 * ========================= */
const state = { index: 0, answers: new Array(QUESTIONS.length).fill(null) };

const qs = {
  start: document.getElementById("start-screen"),
  quiz: document.getElementById("quiz-screen"),
  result: document.getElementById("result-screen"),
  startBtn: document.getElementById("start-btn"),
  prevBtn: document.getElementById("prev-btn"),
  nextBtn: document.getElementById("next-btn"),
  copyBtn: document.getElementById("copy-btn"),
  restartBtn: document.getElementById("restart-btn"),
  progressCurrent: document.getElementById("progress-current"),
  progressTotal: document.getElementById("progress-total"),
  progressFill: document.getElementById("progress-fill"),
  scenePill: document.getElementById("scene-pill"),
  qTitle: document.getElementById("question-title"),
  qText: document.getElementById("question-text"),
  options: document.getElementById("options"),
  endpointInput: document.getElementById("endpoint-input") || null,
  saveEndpointBtn: document.getElementById("save-endpoint-btn") || null,
  modelInput: document.getElementById("model-input") || null,
  aiGenerateBtn: document.getElementById("ai-generate-btn") || null,
  aiStatus: document.getElementById("ai-status") || null
};

function getSavedEndpoint() {
  return localStorage.getItem("ai_proxy_endpoint") || "/api/report";
}
function setStatus(text) {
  if (qs.aiStatus) qs.aiStatus.textContent = text;
}

function formatModelStatus(prefix, model) {
  return model ? `${prefix} 当前模型：${model}` : prefix;
}

function setButtonBusy(button, disabled) {
  if (button) button.disabled = disabled;
}

function setAvatarImage(img, title) {
  if (!img) return;

  img.onerror = () => {
    img.onerror = null;
    img.src = "./raccoon.jpg";
  };
  img.src = `/api/avatar?title=${encodeURIComponent(title)}`;
}

function show(screen) {
  [qs.start, qs.quiz, qs.result].forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
}

/* =========================
 * 4) 问题渲染
 * ========================= */
function renderQuestion() {
  const idx = state.index;
  const [scene, text, options] = QUESTIONS[idx];

  qs.progressCurrent.textContent = idx + 1;
  qs.progressTotal.textContent = QUESTIONS.length;
  qs.progressFill.style.width = `${((idx + 1) / QUESTIONS.length) * 100}%`;

  qs.scenePill.textContent = scene;
  qs.qTitle.textContent = `第 ${idx + 1} 题`;
  qs.qText.textContent = text;
  qs.options.innerHTML = "";

  options.forEach((op, i) => {
    const btn = document.createElement("button");
    btn.className = "option";
    if (state.answers[idx] === i) btn.classList.add("active");
    btn.textContent = `${String.fromCharCode(65 + i)}. ${op[0]}`;
    btn.onclick = () => {
      state.answers[idx] = i;
      renderQuestion();
    };
    qs.options.appendChild(btn);
  });

  qs.prevBtn.disabled = idx === 0;
  qs.nextBtn.disabled = state.answers[idx] === null;
  qs.nextBtn.textContent = idx === QUESTIONS.length - 1 ? "查看结果" : "下一题";
}

/* =========================
 * 5) 评分与本地报告
 * ========================= */
function computeScores() {
  const scores = Object.fromEntries(DIMS.map(d => [d, 0]));
  state.answers.forEach((answer, i) => {
    const effect = QUESTIONS[i][2][answer][1];
    Object.entries(effect).forEach(([k, v]) => (scores[k] += v));
  });
  return scores;
}

function titleFromScores(scores) {
  const sorted = [...DIMS].sort((a, b) => scores[b] - scores[a]);
  const pair = `${sorted[0]}+${sorted[1]}`;
  return TITLE_MAP[pair] || "城市夜行观察员";
}

function subtitlesFromScores(scores) {
  return SUB_TITLES.filter(r => r.when(scores)).map(r => r.text).slice(0, 2);
}

function generateReport(scores) {
  const title = titleFromScores(scores);
  const subs = subtitlesFromScores(scores);
  const verdict = `你是「${title}」${subs.length ? `（${subs.join(" / ")}）` : ""}。你不是没想法，你只是把“想法”先寄存在明天。`;

  const talents = [];
  if (scores.SAFE >= 8) talents.push("你有风险雷达，遇事不会第一时间把自己送走。");
  if (scores.DO >= 8) talents.push("你具备推进能力，不会把所有愿望都留在收藏夹。");
  if (scores.SOCIAL >= 8) talents.push("你在关系场里有温度，关键时刻能把场子接住。");
  if (scores.MASK >= 8) talents.push("你有表达分寸感，知道什么时候该体面收尾。");
  if (scores.DRAMA >= 8) talents.push("你对生活有叙事能力，能把普通日子过出镜头感。");
  if (talents.length < 2) {
    talents.push("你最大的天赋是自我观察，知道自己在逃什么、盼什么。");
    talents.push("你并不迟钝，你只是选择了更省电的生存节奏。");
  }

  const traps = [];
  if (scores.AVOID >= 8) traps.push("你容易把‘再想想’当止痛药，短期舒适，长期焦虑。建议：把任务切成5分钟动作，先启动再评价。");
  if (scores.MASK >= 8 && scores.SOCIAL <= 3) traps.push("你过于维护体面，导致真实需求常常缺席。建议：每周至少一次直接表达‘我其实需要…’。");
  if (scores.DRAMA >= 8 && scores.DO <= 4) traps.push("你擅长脑内大制作，但执行预算常常不足。建议：每个灵感只允许保留一个最小版本。");
  if (scores.SAFE >= 9 && scores.DRAMA <= 3) traps.push("你太稳了，稳到错过新机会。建议：每周给自己一次可控冒险。");
  if (traps.length < 2) {
    traps.push("你最大的惯性是‘知道很多，开始很晚’。建议：先做最笨的一步。");
    traps.push("你会在关键处犹豫。建议：把‘正确决定’改成‘可迭代决定’。");
  }

  const manual = [
    "和你相处，最好直说重点，别让你猜。",
    scores.SOCIAL >= 7 ? "你在热闹里能量更高，但也需要被认真听见。" : "你不是冷淡，只是需要慢一点建立信任。",
    "当你开始玩笑变多，通常说明你在掩饰一点点不安。"
  ];

  const quest = scores.DO >= 7
    ? "今晚把一个拖了很久的小事做完，然后允许自己痛快休息。"
    : "今晚只做一件5分钟小事：回一条消息、整理一个角落、发一个确认。做完就算赢。";

  const recap = "从下水道醒来到天亮前收尾，你一路在‘体面、效率、情绪和安全感’之间做权衡。你不是没有勇气，而是太懂代价，所以总在冲动和克制之间拉扯。";

  return { title, verdict, recap, talents: talents.slice(0, 3), traps: traps.slice(0, 2), manual, quest };
}

/* =========================
 * 6) AI 生成
 * ========================= */
function createAiPrompt(scores, baseReport) {
  const sorted = [...DIMS].sort((a, b) => scores[b] - scores[a]);
  return [
    "你是一个毒舌但善良的中文人格解读写手，风格是70%认真洞察+20%幽默+10%温柔。",
    "禁止人身攻击、精神疾病诊断、绝对化标签。",
    "请基于以下数据生成更像长文截图风格的报告，带一点讽刺但不刻薄。",
    `主称号：${baseReport.title}`,
    `基础判词：${baseReport.verdict}`,
    `六维分数：${JSON.stringify(scores)}`,
    `最高维度：${sorted[0]}、${sorted[1]}`,
    "请输出 JSON：",
    "{\"verdict\":\"\",\"story_recap\":\"\",\"talents\":[\"\",\"\"],\"traps\":[\"\",\"\"],\"relationship_manual\":[\"\",\"\"],\"tonight_quest\":\"\"}"
  ].join("\n");
}

async function generateAIReport(scores, baseReport) {
  const endpoint = getSavedEndpoint();
  const model = qs.modelInput.value.trim();
  if (!model) throw new Error("请填写模型名称。");

  const prompt = createAiPrompt(scores, baseReport);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, prompt })
  });

  if (!response.ok) {
    const t = await response.text();
   throw new Error(`AI 请求失败：${response.status} ${t}`);
  }

  const data = await response.json();
  const cleaned = (data?.content || "").replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    throw new Error("AI 返回格式不是 JSON，请重试或更换免费模型。");
  }
}

function applyAIToUI(ai) {
  const normalized = normalizeAIReport(ai);

  if (normalized.verdict) document.getElementById("result-verdict").textContent = normalized.verdict;
  if (normalized.story_recap) document.getElementById("result-recap").textContent = normalized.story_recap;

  if (Array.isArray(normalized.talents) && normalized.talents.length) {
    const talentsEl = document.getElementById("result-talents");
    talentsEl.innerHTML = "";
    normalized.talents.slice(0, 3).forEach(t => {
      const li = document.createElement("li");
      li.textContent = t;
      talentsEl.appendChild(li);
    });
  }

  if (Array.isArray(normalized.traps) && normalized.traps.length) {
    const trapsEl = document.getElementById("result-traps");
    trapsEl.innerHTML = "";
    normalized.traps.slice(0, 2).forEach(t => {
      const li = document.createElement("li");
      li.textContent = t;
      trapsEl.appendChild(li);
    });
  }

  if (Array.isArray(normalized.relationship_manual) && normalized.relationship_manual.length) {
    const manualEl = document.getElementById("result-manual");
    manualEl.innerHTML = "";
    normalized.relationship_manual.slice(0, 3).forEach(m => {
      const li = document.createElement("li");
      li.textContent = m;
      manualEl.appendChild(li);
    });
  }

  if (normalized.tonight_quest) document.getElementById("result-quest").textContent = normalized.tonight_quest;
}

/* =========================
 * 7) 结果渲染（关键改动都在这里）
 * ========================= */
function renderResult() {
  const scores = computeScores();
  const report = generateReport(scores);

  setAvatarImage(document.getElementById("raccoon-avatar"), report.title);

  // 你要的醒目标题：固定“夜行观察员”
  document.getElementById("result-title").textContent = "夜行观察员";
  document.getElementById("result-verdict").textContent = report.verdict;
  document.getElementById("result-recap").textContent = report.recap;

  const talentsEl = document.getElementById("result-talents");
  talentsEl.innerHTML = "";
  report.talents.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t;
    talentsEl.appendChild(li);
  });

  const trapsEl = document.getElementById("result-traps");
  trapsEl.innerHTML = "";
  report.traps.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t;
    trapsEl.appendChild(li);
  });

  const manualEl = document.getElementById("result-manual");
  manualEl.innerHTML = "";
  report.manual.forEach(m => {
    const li = document.createElement("li");
    li.textContent = m;
    manualEl.appendChild(li);
  });

  document.getElementById("result-quest").textContent = report.quest;
  setStatus("正在自动生成 AI 报告…");

  qs.copyBtn.onclick = async () => {
    const text = [
      `【浣熊今天怎么活】`,
      `夜行观察员`,
      document.getElementById("result-verdict").textContent,
      `- 剧情回放：${document.getElementById("result-recap").textContent}`,
      `- 今晚任务：${document.getElementById("result-quest").textContent}`
    ].join("\n");
    await navigator.clipboard.writeText(text);
    qs.copyBtn.textContent = "已复制 ✅";
    setTimeout(() => (qs.copyBtn.textContent = "复制结果文案"), 1200);
  };

  // 手动重试按钮只在页面上存在时启用。
  if (qs.aiGenerateBtn) {
    qs.aiGenerateBtn.onclick = async () => {
      setButtonBusy(qs.aiGenerateBtn, true);
      setStatus("AI 正在写你今天的浣熊传记…");
      try {
        const ai = await generateAIReport(scores, report);
        applyAIToUI(ai.content);
        setStatus(formatModelStatus("AI 报告已生成。", ai.model));
      } catch (error) {
        setStatus(`生成失败：${error.message}`);
      } finally {
        setButtonBusy(qs.aiGenerateBtn, false);
      }
    };
  }

  // 自动生成（你要的：不需要玩家再点）
  (async () => {
    setButtonBusy(qs.aiGenerateBtn, true);
    try {
      const ai = await generateAIReport(scores, report);
      applyAIToUI(ai.content);
      setStatus(formatModelStatus("AI 报告已自动生成。", ai.model));
    } catch (error) {
      setStatus(`自动生成失败：${error.message}`);
    } finally {
      setButtonBusy(qs.aiGenerateBtn, false);
    }
  })();
}

/* =========================
 * 8) 事件绑定
 * ========================= */
qs.startBtn.onclick = () => {
  state.index = 0;
  state.answers = new Array(QUESTIONS.length).fill(null);
  show(qs.quiz);
  renderQuestion();
};

qs.prevBtn.onclick = () => {
  if (state.index > 0) {
    state.index -= 1;
    renderQuestion();
  }
};

qs.nextBtn.onclick = () => {
  if (state.answers[state.index] === null) return;
  if (state.index < QUESTIONS.length - 1) {
    state.index += 1;
    renderQuestion();
  } else {
    show(qs.result);
    renderResult();
  }
};

qs.restartBtn.onclick = () => show(qs.start);

if (qs.saveEndpointBtn && qs.endpointInput) {
  qs.saveEndpointBtn.onclick = () => {
    const endpoint = qs.endpointInput.value.trim();
    if (!endpoint) return setStatus("请先输入 API 地址。");
    localStorage.setItem("ai_proxy_endpoint", endpoint);
    setStatus("API 地址已保存。");
  };
}
// 覆盖旧的 generateAIReport：固定 endpoint，模型交给后端默认值或环境变量决定
generateAIReport = async function (scores, baseReport) {
  const endpoint = "/api/report";
  const prompt = createAiPrompt(scores, baseReport);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    const message =
      payload?.message ||
      payload?.detail ||
      payload?.error ||
      `AI 请求失败：${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  try {
    return {
      content: parseAIJsonResponse(data?.content || ""),
      model: data?.model || ""
    };
  } catch {
    throw new Error("AI 返回格式不是 JSON");
  }
};
if (qs.endpointInput) qs.endpointInput.value = getSavedEndpoint();

function parseAIJsonResponse(text) {
  const cleaned = String(text).replace(/```json|```/gi, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const objectText = extractFirstJsonObject(cleaned);
    if (!objectText) throw new Error("missing json object");
    return JSON.parse(objectText);
  }
}

function extractFirstJsonObject(text) {
  let start = -1;
  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];

    if (start === -1) {
      if (char === "{") {
        start = i;
        depth = 1;
      }
      continue;
    }

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === "\"") {
        inString = false;
      }
      continue;
    }

    if (char === "\"") {
      inString = true;
      continue;
    }

    if (char === "{") {
      depth += 1;
      continue;
    }

    if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return text.slice(start, i + 1);
      }
    }
  }

  return "";
}

function normalizeAIReport(payload) {
  const root = findBestReportObject(payload);

  const verdict = firstString(
    root.verdict,
    root.summary,
    root.overview,
    root.analysis,
    root.description,
    root.result,
    root.title
  );

  const storyRecap = firstString(
    root.story_recap,
    root.storyRecap,
    root.recap,
    root.story,
    root.narrative,
    root.details
  );

  const talents = normalizeList(
    root.talents,
    root.strengths,
    root.highlights,
    root.advantages,
    root.good_points
  );

  const traps = normalizeList(
    root.traps,
    root.weaknesses,
    root.risks,
    root.pitfalls,
    root.bad_points
  );

  const relationshipManual = normalizeList(
    root.relationship_manual,
    root.relationshipManual,
    root.relationship_advice,
    root.relationshipAdvice,
    root.advice,
    root.suggestions
  );

  const tonightQuest = firstString(
    root.tonight_quest,
    root.tonightQuest,
    root.quest,
    root.action,
    root.next_step,
    root.nextStep
  );

  return {
    verdict,
    story_recap: storyRecap,
    talents,
    traps,
    relationship_manual: relationshipManual,
    tonight_quest: tonightQuest,
  };
}

function findBestReportObject(payload) {
  const queue = [payload];
  const seen = new Set();
  let best = {};
  let bestScore = -1;

  while (queue.length) {
    const current = queue.shift();
    if (!current || typeof current !== "object" || seen.has(current)) continue;
    seen.add(current);

    const score = scoreReportObject(current);
    if (score > bestScore) {
      best = current;
      bestScore = score;
    }

    for (const value of Object.values(current)) {
      if (value && typeof value === "object") queue.push(value);
    }
  }

  return best;
}

function scoreReportObject(obj) {
  let score = 0;
  const keys = Object.keys(obj);
  for (const key of keys) {
    if (/verdict|summary|analysis|story|recap|quest|talent|strength|trap|risk|advice/i.test(key)) {
      score += 2;
    }
    const value = obj[key];
    if (typeof value === "string" && value.trim()) score += 1;
    if (Array.isArray(value) && value.length) score += 1;
  }
  return score;
}

function firstString(...values) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

function normalizeList(...values) {
  for (const value of values) {
    if (Array.isArray(value)) {
      const items = value
        .map((item) => (typeof item === "string" ? item.trim() : ""))
        .filter(Boolean);
      if (items.length) return items;
    }

    if (typeof value === "string" && value.trim()) {
      const items = value
        .split(/\n|[;；]|(?<=\S)[,，](?=\S)/)
        .map((item) => item.replace(/^[-*•]\s*/, "").trim())
        .filter(Boolean);
      if (items.length) return items;
    }
  }

  return [];
}
