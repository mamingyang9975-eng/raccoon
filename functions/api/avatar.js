// functions/api/avatar.js

const TITLE_TO_SKIN = {
  "体面生存架构师": "mask_safe",
  "战术性失踪总监": "mask_avoid",
  "精致崩溃艺术家": "mask_drama",
  "稳健推进工程师": "safe_do",
  "风险规避型观察员": "safe_avoid",
  "礼貌联盟协调员": "safe_social",
  "夜间气氛组组长": "social_drama",
  "行动派社交发动机": "social_do",
  "间歇性热闹选手": "social_avoid",
  "浪漫废墟建筑师": "drama_avoid",
  "理想主义执行官": "drama_do",
  "最后一刻逆袭者": "avoid_do"
};

const SKINS = {
  mask_safe:   { body:"#98A7AA", cloth:"#2F6F5D", accent:"#F4C542", eye:"calm",  mouth:"flat",  item:"glasses" },
  mask_avoid:  { body:"#A7ACA2", cloth:"#4C6256", accent:"#C9D99E", eye:"down",  mouth:"flat",  item:"cap" },
  mask_drama:  { body:"#9DA0B0", cloth:"#5F6FA3", accent:"#FFD84D", eye:"spark", mouth:"smile", item:"star" },
  safe_do:     { body:"#8FA8A3", cloth:"#2D8A63", accent:"#FFD84D", eye:"focus", mouth:"smile", item:"compass" },
  safe_avoid:  { body:"#9EAD9A", cloth:"#5A7456", accent:"#D9E87C", eye:"down",  mouth:"flat",  item:"scarf" },
  safe_social: { body:"#95B0A1", cloth:"#2E7D5D", accent:"#F7D34B", eye:"warm",  mouth:"smile", item:"badge" },
  social_drama:{ body:"#A89C8B", cloth:"#7B6A43", accent:"#FFD84D", eye:"spark", mouth:"laugh", item:"earring" },
  social_do:   { body:"#8DB19C", cloth:"#2FA06F", accent:"#F3C943", eye:"focus", mouth:"smile", item:"headband" },
  social_avoid:{ body:"#A2ABA1", cloth:"#5C6E60", accent:"#D9DF8B", eye:"half",  mouth:"curve", item:"mask" },
  drama_avoid: { body:"#A9A0B0", cloth:"#6A5A8E", accent:"#F4CF53", eye:"half",  mouth:"curve", item:"moon" },
  drama_do:    { body:"#B1A184", cloth:"#8B6A2F", accent:"#FFD84D", eye:"spark", mouth:"laugh", item:"flame" },
  avoid_do:    { body:"#9AA69B", cloth:"#5B7C45", accent:"#E7D24E", eye:"focus", mouth:"curve", item:"watch" }
};

function eyeSvg(type) {
  if (type === "down") return `
    <path d="M95 112 Q104 116 113 112" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M143 112 Q152 116 161 112" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  if (type === "spark") return `
    <circle cx="104" cy="112" r="5" fill="#fff"/><circle cx="152" cy="112" r="5" fill="#fff"/>
    <circle cx="108" cy="108" r="2" fill="#FFD84D"/>`;
  if (type === "focus") return `
    <circle cx="104" cy="112" r="5" fill="#fff"/><circle cx="152" cy="112" r="5" fill="#fff"/>
    <rect x="100" y="116" width="8" height="2" fill="#fff"/><rect x="148" y="116" width="8" height="2" fill="#fff"/>`;
  if (type === "warm") return `
    <ellipse cx="104" cy="112" rx="6" ry="5" fill="#fff"/><ellipse cx="152" cy="112" rx="6" ry="5" fill="#fff"/>`;
  if (type === "half") return `
    <path d="M95 111 Q104 108 113 111" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M143 111 Q152 108 161 111" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  return `<ellipse cx="104" cy="112" rx="6" ry="4" fill="#fff"/><ellipse cx="152" cy="112" rx="6" ry="4" fill="#fff"/>`; // calm
}

function mouthSvg(type) {
  if (type === "smile") return `<path d="M112 150 Q128 162 144 150" stroke="#2E2E2E" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  if (type === "laugh") return `<path d="M110 150 Q128 168 146 150" stroke="#2E2E2E" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  if (type === "curve") return `<path d="M112 154 Q128 148 144 154" stroke="#2E2E2E" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  return `<path d="M114 152 L142 152" stroke="#2E2E2E" stroke-width="4" stroke-linecap="round"/>`; // flat
}

function itemSvg(item, accent) {
  switch (item) {
    case "glasses":
      return `<rect x="90" y="101" width="20" height="14" rx="4" fill="none" stroke="${accent}" stroke-width="3"/>
              <rect x="146" y="101" width="20" height="14" rx="4" fill="none" stroke="${accent}" stroke-width="3"/>
              <line x1="110" y1="108" x2="146" y2="108" stroke="${accent}" stroke-width="3"/>`;
    case "cap":
      return `<path d="M86 84 Q128 60 170 84 L170 92 L86 92 Z" fill="${accent}"/>`;
    case "star":
      return `<path d="M176 88 l4 10 10 1-8 6 3 10-9-6-9 6 3-10-8-6 10-1z" fill="${accent}"/>`;
    case "compass":
      return `<circle cx="170" cy="186" r="10" fill="${accent}"/><path d="M170 178 L174 190 L166 190 Z" fill="#2E2E2E"/>`;
    case "scarf":
      return `<path d="M96 166 H160 V176 H96 Z" fill="${accent}"/><rect x="146" y="176" width="8" height="16" fill="${accent}"/>`;
    case "badge":
      return `<circle cx="168" cy="188" r="8" fill="${accent}"/><circle cx="168" cy="188" r="3" fill="#fff"/>`;
    case "earring":
      return `<circle cx="176" cy="120" r="4" fill="${accent}"/>`;
    case "headband":
      return `<rect x="86" y="90" width="84" height="8" rx="4" fill="${accent}"/>`;
    case "mask":
      return `<rect x="108" y="122" width="40" height="10" rx="5" fill="${accent}"/>`;
    case "moon":
      return `<circle cx="176" cy="90" r="8" fill="${accent}"/><circle cx="180" cy="88" r="8" fill="#F4FFF4"/>`;
    case "flame":
      return `<path d="M170 194 C160 184 172 174 174 166 C184 178 185 188 178 196 Z" fill="${accent}"/>`;
    case "watch":
      return `<rect x="92" y="184" width="20" height="8" rx="4" fill="${accent}"/><circle cx="102" cy="188" r="3" fill="#fff"/>`;
    default:
      return "";
  }
}

function makeFlatRaccoonSvg(title = "稳健推进工程师") {
  const key = TITLE_TO_SKIN[title] || "safe_do";
  const s = SKINS[key];

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
  <rect width="256" height="256" rx="24" fill="#F5FFF5"/>

  <!-- 耳朵 -->
  <circle cx="88" cy="70" r="18" fill="${s.body}"/>
  <circle cx="168" cy="70" r="18" fill="${s.body}"/>
  <circle cx="88" cy="70" r="9" fill="#2F3A40"/>
  <circle cx="168" cy="70" r="9" fill="#2F3A40"/>

  <!-- 头 -->
  <ellipse cx="128" cy="112" rx="62" ry="52" fill="${s.body}"/>
  <ellipse cx="104" cy="112" rx="22" ry="16" fill="#2F3A40"/>
  <ellipse cx="152" cy="112" rx="22" ry="16" fill="#2F3A40"/>
  ${eyeSvg(s.eye)}
  <ellipse cx="128" cy="130" rx="10" ry="7" fill="#2E2E2E"/>
  ${mouthSvg(s.mouth)}

  <!-- 身体 -->
  <ellipse cx="128" cy="196" rx="62" ry="42" fill="${s.body}"/>
  <rect x="86" y="168" width="84" height="42" rx="10" fill="${s.cloth}"/>

  <!-- 配件 -->
  ${itemSvg(s.item, s.accent)}
</svg>`;
}

export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "稳健推进工程师";
  const svg = makeFlatRaccoonSvg(title);

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
