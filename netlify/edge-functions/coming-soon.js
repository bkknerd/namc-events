// Coming soon switch. Edited in the CMS: Coming soon page > "Show the coming soon page to visitors".
// When it is on, every page request is answered with /coming-soon/, except the editor,
// content, images and anyone holding the preview key (/?preview=KEY sets a cookie; /?preview=off clears it).
let cache = { at: 0, data: null };

async function settings(url) {
  const now = Date.now();
  if (cache.data && now - cache.at < 15000) return cache.data;
  try {
    const res = await fetch(new URL('/content/coming-soon.json', url), { headers: { 'cache-control': 'no-cache' } });
    cache = { at: now, data: res.ok ? await res.json() : {} };
  } catch (e) {
    cache = { at: now, data: cache.data || {} };
  }
  return cache.data;
}

export default async (request, context) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') return;
  const url = new URL(request.url);
  const cs = await settings(url);
  if (!cs || !cs.enabled) return;
  const key = String(cs.preview_key || '').trim();
  const asked = url.searchParams.get('preview');
  if (key && asked === key) {
    const res = await context.next();
    const out = new Response(res.body, res);
    out.headers.append('set-cookie', `namc_preview=${encodeURIComponent(key)}; Path=/; Max-Age=2592000; SameSite=Lax; Secure`);
    out.headers.set('cache-control', 'no-store');
    return out;
  }
  if (asked !== 'off' && key && context.cookies.get('namc_preview') === encodeURIComponent(key)) return;
  const page = await fetch(new URL('/coming-soon/', url));
  const out = new Response(page.body, { status: 200, headers: { 'content-type': page.headers.get('content-type') || 'text/html; charset=utf-8' } });
  out.headers.set('cache-control', 'no-store');
  if (asked === 'off') out.headers.append('set-cookie', 'namc_preview=; Path=/; Max-Age=0; SameSite=Lax; Secure');
  return out;
};

export const config = {
  path: '/*',
  excludedPath: ['/admin', '/admin/*', '/content/*', '/img/*', '/coming-soon', '/coming-soon/*', '/submissions', '/submissions/*', '/api/*', '/.netlify/*',
    '/favicon.svg', '/favicon.ico', '/apple-touch-icon.png', '/og-image.png', '/robots.txt', '/sitemap.xml'],
};
