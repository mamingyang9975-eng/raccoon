export async function onRequestGet({ env }) {
  const keys = Object.keys(env || {}).sort();

  return json({
    hasEnvObject: !!env,
    keys,
    hasOpenRouterApiKey: Boolean(env?.OPENROUTER_API_KEY),
    hasOpenRouterModel: Boolean(env?.OPENROUTER_MODEL),
    hasSiteUrl: Boolean(env?.SITE_URL),
  });
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
