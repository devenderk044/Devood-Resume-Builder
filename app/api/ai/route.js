export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const OVERLOAD_STATUSES = new Set([429, 500, 502, 503, 504, 529]);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function callGemini({ apiKey, model, payload }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, ok: res.ok, data };
}

export async function POST(request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      {
        error:
          'GEMINI_API_KEY is not set. Add it to .env.local and restart the dev server.',
      },
      { status: 500 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: 'Invalid JSON in request body' },
      { status: 400 },
    );
  }

  const {
    prompt,
    model = 'gemini-2.5-flash',
    max_tokens = 8000,
    system,
    json = false,
  } = body;

  if (!prompt || typeof prompt !== 'string') {
    return Response.json({ error: 'prompt is required' }, { status: 400 });
  }

  const payload = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      maxOutputTokens: max_tokens,
      temperature: 0.7,
    },
  };
  if (system) payload.systemInstruction = { parts: [{ text: system }] };
  if (json) payload.generationConfig.responseMimeType = 'application/json';

  const fallback = model === 'gemini-2.0-flash' ? null : 'gemini-2.0-flash';
  const attempts = [
    { model, delay: 0 },
    { model, delay: 1500 },
  ];
  if (fallback) attempts.push({ model: fallback, delay: 0 });

  let last = null;
  for (const a of attempts) {
    if (a.delay) await sleep(a.delay);
    try {
      last = await callGemini({ apiKey, model: a.model, payload });
    } catch (e) {
      last = {
        ok: false,
        status: 502,
        data: { error: { message: e?.message || 'fetch failed' } },
      };
    }
    if (last.ok) {
      const text =
        last.data?.candidates?.[0]?.content?.parts
          ?.map((p) => p.text || '')
          .join('') || '';
      if (text)
        return Response.json({
          text,
          model: a.model,
          fallback: a.model !== model,
        });
      last = {
        ok: false,
        status: 502,
        data: {
          error: {
            message:
              'Empty response — blocked by safety filters or token budget exhausted by thinking',
          },
        },
      };
      break;
    }
    if (!OVERLOAD_STATUSES.has(last.status)) break;
  }

  const msg =
    last?.data?.error?.message ||
    `Gemini API error (${last?.status || 'unknown'})`;
  return Response.json(
    {
      error:
        OVERLOAD_STATUSES.has(last?.status)
          ? 'Gemini is overloaded right now. Please try again in a minute.'
          : msg,
    },
    { status: last?.status || 502 },
  );
}
