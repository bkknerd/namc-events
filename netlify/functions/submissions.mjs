// Private form inbox for the NAMC team. Reads Netlify Forms submissions with a server-side token.
// Needs two environment variables in Netlify (Site configuration > Environment variables):
//   NETLIFY_API_TOKEN     a Netlify personal access token
//   SUBMISSIONS_PASSWORD  the password the team types on /submissions
const API = 'https://api.netlify.com/api/v1';
const FALLBACK_SITE = 'f3ea374a-fa00-4982-a86d-1a224647ec2c';
const tries = new Map();

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store', 'x-robots-tag': 'noindex' } });

function same(a, b) {
  const x = new TextEncoder().encode(String(a)), y = new TextEncoder().encode(String(b));
  let d = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) d |= (x[i] || 0) ^ (y[i] || 0);
  return d === 0;
}

async function api(path, token) {
  const r = await fetch(API + path, { headers: { authorization: 'Bearer ' + token } });
  if (!r.ok) throw new Error('Netlify API ' + r.status);
  return r.json();
}

export default async (req, context) => {
  if (req.method !== 'POST') return json({ error: 'Use POST' }, 405);
  const token = process.env.NETLIFY_API_TOKEN, pass = process.env.SUBMISSIONS_PASSWORD;
  if (!token || !pass) return json({ error: 'not_configured' }, 503);
  const ip = context.ip || 'x', now = Date.now(), t = tries.get(ip) || { n: 0, at: now };
  if (now - t.at > 15 * 60e3) { t.n = 0; t.at = now; }
  if (t.n >= 10) return json({ error: 'too_many_attempts' }, 429);
  let body = {};
  try { body = await req.json(); } catch (e) {}
  if (!same(body.password || '', pass)) { t.n++; tries.set(ip, t); return json({ error: 'wrong_password' }, 401); }
  tries.delete(ip);
  const site = (context.site && context.site.id) || process.env.SITE_ID || FALLBACK_SITE;
  try {
    const forms = await api(`/sites/${site}/forms`, token);
    const out = [];
    for (const f of forms) {
      const subs = [];
      for (let page = 1; page <= 20; page++) {
        const batch = await api(`/forms/${f.id}/submissions?per_page=100&page=${page}`, token);
        subs.push(...batch);
        if (batch.length < 100) break;
      }
      out.push({
        name: f.name, count: subs.length, fields: (f.fields || []).map(x => x.name).filter(n => n !== 'bot-field'),
        submissions: subs.map(s => ({ id: s.id, created_at: s.created_at, data: Object.fromEntries(Object.entries(s.data || {}).filter(([k]) => !['bot-field', 'ip', 'user_agent', 'referrer'].includes(k))) })),
      });
    }
    return json({ forms: out, fetched_at: new Date().toISOString() });
  } catch (e) {
    return json({ error: 'netlify_api', detail: String(e.message || e) }, 502);
  }
};

export const config = { path: '/api/submissions' };
