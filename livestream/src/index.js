export default {
  async fetch(request, env) {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/png" href="https://build.siliceoroman.xyz/favicon.png">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Live Stream — Build on Cloudflare</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;700&family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --cf-orange: #F6821F;
      --cf-dark: #0A0A0B;
      --cf-dark-2: #111114;
      --cf-dark-3: #1A1A1F;
      --cf-border: rgba(255,255,255,0.07);
      --cf-text: #E8E8EC;
      --cf-muted: #6B6B7A;
    }

    body {
      font-family: 'Syne', sans-serif;
      background: var(--cf-dark);
      color: var(--cf-text);
      min-height: 100vh;
    }

    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background: radial-gradient(ellipse at 50% 0%, rgba(246,130,31,0.1) 0%, transparent 60%);
      pointer-events: none;
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2rem;
      height: 60px;
      background: rgba(10,10,11,0.85);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--cf-border);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .logo {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 1rem;
      color: var(--cf-text);
      text-decoration: none;
      letter-spacing: -0.02em;
    }

    .logo span { color: var(--cf-orange); }

    .back-link {
      font-family: 'Geist Mono', monospace;
      font-size: 0.72rem;
      color: var(--cf-muted);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      transition: color 0.2s;
    }

    .back-link:hover { color: var(--cf-text); }

    main {
      max-width: 960px;
      margin: 0 auto;
      padding: 4rem 1.5rem;
    }

    .page-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-family: 'Geist Mono', monospace;
      font-size: 0.68rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--cf-orange);
      background: rgba(246,130,31,0.1);
      border: 1px solid rgba(246,130,31,0.25);
      padding: 0.3rem 0.8rem;
      border-radius: 100px;
      margin-bottom: 1.5rem;
    }

    h1 {
      font-size: 2.5rem;
      font-weight: 800;
      letter-spacing: -0.04em;
      color: #fff;
      margin-bottom: 0.75rem;
    }

    .subtitle {
      color: var(--cf-muted);
      font-size: 0.95rem;
      line-height: 1.7;
      margin-bottom: 3rem;
    }

    .player-wrapper {
      width: 100%;
      aspect-ratio: 16/9;
      background: var(--cf-dark-2);
      border: 1px solid var(--cf-border);
      border-radius: 16px;
      overflow: hidden;
      margin-bottom: 1.5rem;
    }

    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }

    .status {
      font-family: 'Geist Mono', monospace;
      font-size: 0.75rem;
      color: var(--cf-muted);
      text-align: center;
      padding: 1rem;
      background: var(--cf-dark-2);
      border: 1px solid var(--cf-border);
      border-radius: 8px;
    }
  </style>
</head>
<body>

  <header>
    <a href="https://build.siliceoroman.xyz" class="logo">Build on <span>Cloudflare</span></a>
    <a href="https://build.siliceoroman.xyz" class="back-link">← Back to projects</a>
  </header>

  <main>
    <div class="page-badge">Project 11 — Workers + Stream + OBS</div>
    <h1>🎥 Live Stream</h1>
    <p class="subtitle">Live streaming with OBS and Cloudflare Stream — broadcast live video from OBS and watch it in any browser via a Cloudflare Worker.</p>

    <div class="player-wrapper">
      <iframe
        src="https://customer-9g81vg2a6lvusia4.cloudflarestream.com/${env.STREAM_ID}/iframe"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
        allowfullscreen>
      </iframe>
    </div>
    <div class="status">🟠 Stream may be offline if no one is currently broadcasting</div>
  </main>

</body>
</html>`;

    return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  },
};