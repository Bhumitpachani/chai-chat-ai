import serverHandler from '../dist/server/index.mjs';

export default async function handler(req, res) {
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
  const url = `${protocol}://${host}${req.url}`;

  const bodyChunks = [];
  for await (const chunk of req) bodyChunks.push(chunk);
  const body =
    bodyChunks.length > 0 && !['GET', 'HEAD'].includes(req.method)
      ? Buffer.concat(bodyChunks)
      : undefined;

  const headers = [];
  for (const [k, v] of Object.entries(req.headers)) {
    if (v == null) continue;
    if (Array.isArray(v)) {
      for (const val of v) headers.push([k, val]);
    } else {
      headers.push([k, String(v)]);
    }
  }

  const webRequest = new Request(url, {
    method: req.method,
    headers,
    ...(body ? { body, duplex: 'half' } : {}),
  });

  const webResponse = await serverHandler.fetch(webRequest, {});

  res.statusCode = webResponse.status;
  webResponse.headers.forEach((value, key) => res.setHeader(key, value));

  if (webResponse.body) {
    const reader = webResponse.body.getReader();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(Buffer.from(value));
      }
    } finally {
      reader.releaseLock();
    }
  }
  res.end();
}
