# Build on Cloudflare

A portfolio of 9 beginner-friendly apps built on the Cloudflare developer platform. Each project explores a different Cloudflare service — proving that even a novice can ship real, production-grade apps on the edge.

🌐 **Live site:** [build.siliceoroman.xyz](https://build.siliceoroman.xyz)

---

## Projects

| # | Project | Cloudflare Service | Deploy Method |
|---|---|---|---|
| 01 | Landing Page | Pages | `git push` |
| 02 | Guestbook | Workers + D1 | `npx wrangler deploy` |
| 03 | Image Gallery | Workers + R2 | `npx wrangler deploy` |
| 04 | Visitor Counter | Workers + KV | `npx wrangler deploy` |
| 05 | URL Shortener | Workers + KV | `npx wrangler deploy` |
| 06 | AI Chatbot | Workers AI | `npx wrangler deploy` |
| 07 | MCP Server | Workers + MCP | `npx wrangler deploy` |
| 08 | Cloudflare MCP Guide | Pages | `git push` |
| 09 | Guestbook v2 | Workers + D1 + Turnstile | `npx wrangler deploy` |

---

## Stack

- **Cloudflare Pages** — static site hosting with global CDN
- **Cloudflare Workers** — serverless JavaScript at the edge
- **Workers D1** — SQLite database at the edge
- **Workers KV** — globally replicated key-value store
- **R2 Object Storage** — S3-compatible storage with no egress fees
- **Workers AI** — LLM inference at the edge (Llama 3.1)
- **Turnstile** — privacy-friendly bot protection, no CAPTCHAs required
- **MCP Protocol** — Model Context Protocol for AI tool use
- **Wrangler CLI** — Cloudflare's developer CLI tool

---

## Getting Started

### Prerequisites
- [Node.js v20+](https://nodejs.org)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) — `npm install -g wrangler`
- A free [Cloudflare account](https://cloudflare.com)

### Local Development
```bash
# Clone the repo
git clone https://github.com/uNBees/build-on-cloudflare.git
cd build-on-cloudflare

# Navigate to any project
cd guestbook

# Run locally
npx wrangler dev
```

### Deployment
```bash
# Worker projects (02-07, 09)
npx wrangler deploy

# Pages projects (01, 08)
git push  # Cloudflare auto-deploys on push
```

### Secrets
Sensitive values like API keys are stored using Wrangler's secret manager and are never committed to this repo:
```bash
npx wrangler secret put SECRET_NAME
```

---

## License
MIT — feel free to use this as a starting point for your own Cloudflare projects!