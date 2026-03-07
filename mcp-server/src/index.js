import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export class MyMCP extends McpAgent {
  server = new McpServer({
    name: "Cloudflare MCP Server",
    version: "1.0.0",
  });

  async init() {
    // Tool 1: Calculator
    this.server.tool(
      "calculate",
      "Perform basic math calculations",
      {
        expression: z.string().describe("A math expression like '2 + 2' or '10 * 5'"),
      },
      async ({ expression }) => {
        try {
          const result = Function(`"use strict"; return (${expression})`)();
          return { content: [{ type: "text", text: `${expression} = ${result}` }] };
        } catch (e) {
          return { content: [{ type: "text", text: `Error: Invalid expression` }] };
        }
      }
    );

    // Tool 2: Cloudflare Info
    this.server.tool(
      "cloudflare_info",
      "Get information about a Cloudflare service",
      {
        service: z.enum(["workers", "pages", "d1", "r2", "kv", "ai", "mcp"]).describe("The Cloudflare service to look up"),
      },
      async ({ service }) => {
        const info = {
          workers: "Cloudflare Workers lets you run JavaScript at the edge in 300+ locations worldwide. Zero cold starts, pay per request.",
          pages: "Cloudflare Pages is a JAMstack platform for deploying static sites and full-stack apps with Git integration and free SSL.",
          d1: "D1 is Cloudflare's serverless SQLite database, built natively for Workers. Supports read replicas globally.",
          r2: "R2 is Cloudflare's S3-compatible object storage with zero egress fees. Perfect for images, videos, and files.",
          kv: "Workers KV is a globally replicated key-value store. Reads are ultra-fast, writes propagate within 60 seconds.",
          ai: "Workers AI lets you run AI models at the edge including LLMs, image classification, and embeddings — no GPU needed.",
          mcp: "Model Context Protocol (MCP) is an open standard by Anthropic for connecting AI models to external tools and data sources.",
        };
        return { content: [{ type: "text", text: info[service] }] };
      }
    );

    // Tool 3: Random joke
    this.server.tool(
      "get_joke",
      "Get a random developer joke",
      {},
      async () => {
        const jokes = [
          "Why do programmers prefer dark mode? Because light attracts bugs!",
          "Why did the developer go broke? Because he used up all his cache!",
          "What's a programmer's favorite hangout spot? The Foo Bar!",
          "Why do Java developers wear glasses? Because they don't C#!",
          "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?'",
          "Why was the JavaScript developer sad? Because he didn't Node how to Express himself!",
          "What do you call a Cloudflare Worker that tells jokes? A stand-up comedian at the edge!",
        ];
        const joke = jokes[Math.floor(Math.random() * jokes.length)];
        return { content: [{ type: "text", text: joke }] };
      }
    );

    // Tool 4: Word counter
    this.server.tool(
      "count_words",
      "Count the words and characters in a text",
      {
        text: z.string().describe("The text to analyze"),
      },
      async ({ text }) => {
        const words = text.trim().split(/\s+/).filter(Boolean).length;
        const chars = text.length;
        const sentences = text.split(/[.!?]+/).filter(Boolean).length;
        return {
          content: [{
            type: "text",
            text: `Words: ${words}\nCharacters: ${chars}\nSentences: ${sentences}`
          }]
        };
      }
    );
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/sse" || url.pathname === "/sse/message") {
      return MyMCP.serveSSE("/sse").fetch(request, env, ctx);
    }

    if (url.pathname === "/mcp") {
      return MyMCP.serve("/mcp").fetch(request, env, ctx);
    }

    // Landing page
    return new Response(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/png" href="https://build.siliceoroman.xyz/favicon.png">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MCP Server — Build on Cloudflare</title>
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
    body { font-family: 'Syne', sans-serif; background: var(--cf-dark); color: var(--cf-text); min-height: 100vh; }
    body::before {
      content: ''; position: fixed; inset: 0;
      background: radial-gradient(ellipse at 50% 0%, rgba(246,130,31,0.1) 0%, transparent 60%);
      pointer-events: none;
    }
    header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 2rem; height: 60px;
      background: rgba(10,10,11,0.85); backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--cf-border); position: sticky; top: 0; z-index: 100;
    }
    .logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1rem; color: var(--cf-text); text-decoration: none; letter-spacing: -0.02em; display: flex; align-items: center; gap: 0.6rem; }
    .logo span { color: var(--cf-orange); }
    .back-link { font-family: 'Geist Mono', monospace; font-size: 0.72rem; color: var(--cf-muted); text-decoration: none; transition: color 0.2s; }
    .back-link:hover { color: var(--cf-text); }
    main { max-width: 780px; margin: 0 auto; padding: 4rem 1.5rem; position: relative; z-index: 1; }
    .page-badge {
      display: inline-flex; align-items: center; gap: 0.5rem;
      font-family: 'Geist Mono', monospace; font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase;
      color: var(--cf-orange); background: rgba(246,130,31,0.1); border: 1px solid rgba(246,130,31,0.25);
      padding: 0.3rem 0.8rem; border-radius: 100px; margin-bottom: 1.5rem;
    }
    h1 { font-size: 2.5rem; font-weight: 800; letter-spacing: -0.04em; color: #fff; margin-bottom: 0.75rem; }
    .subtitle { color: var(--cf-muted); font-size: 0.95rem; line-height: 1.7; margin-bottom: 3rem; }
    .endpoint-card {
      background: var(--cf-dark-2); border: 1px solid var(--cf-border); border-radius: 16px; padding: 2rem; margin-bottom: 2rem;
    }
    .card-title { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 1.25rem; }
    .endpoint-row {
      display: flex; align-items: center; gap: 0.75rem;
      background: var(--cf-dark-3); border: 1px solid var(--cf-border); border-radius: 8px; padding: 0.75rem 1rem;
      margin-bottom: 0.75rem;
    }
    .method {
      font-family: 'Geist Mono', monospace; font-size: 0.65rem; font-weight: 700;
      color: var(--cf-orange); background: rgba(246,130,31,0.1); border: 1px solid rgba(246,130,31,0.2);
      padding: 0.2rem 0.5rem; border-radius: 4px; flex-shrink: 0;
    }
    .endpoint-url { font-family: 'Geist Mono', monospace; font-size: 0.78rem; color: var(--cf-text); flex: 1; }
    .endpoint-desc { font-family: 'Geist Mono', monospace; font-size: 0.65rem; color: var(--cf-muted); }
    .tools-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1px; background: var(--cf-border); border: 1px solid var(--cf-border); border-radius: 12px; overflow: hidden; margin-bottom: 2rem; }
    .tool-item { background: var(--cf-dark-2); padding: 1.25rem; }
    .tool-item:hover { background: var(--cf-dark-3); }
    .tool-name { font-family: 'Geist Mono', monospace; font-size: 0.78rem; color: var(--cf-orange); margin-bottom: 0.4rem; }
    .tool-desc { font-size: 0.82rem; color: var(--cf-muted); line-height: 1.5; }
    .connect-card { background: var(--cf-dark-2); border: 1px solid rgba(246,130,31,0.2); border-radius: 16px; padding: 2rem; }
    .connect-title { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 1rem; }
    .connect-step { display: flex; gap: 1rem; align-items: flex-start; margin-bottom: 1rem; }
    .step-num {
      font-family: 'Geist Mono', monospace; font-size: 0.65rem; color: var(--cf-orange);
      background: rgba(246,130,31,0.1); border: 1px solid rgba(246,130,31,0.2);
      width: 24px; height: 24px; border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .step-text { font-size: 0.85rem; color: var(--cf-muted); line-height: 1.6; }
    .step-text strong { color: var(--cf-text); }
    .step-text code { font-family: 'Geist Mono', monospace; font-size: 0.78rem; background: var(--cf-dark-3); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--cf-orange); }
  </style>
</head>
<body>
  <header>
    <a href="https://build.siliceoroman.xyz" class="logo">Build on <span>Cloudflare</span></a>
    <a href="https://build.siliceoroman.xyz" class="back-link">← Back to projects</a>
  </header>
  <main>
    <div class="page-badge">Project 07 — Workers + MCP</div>
    <h1>MCP Server</h1>
    <p class="subtitle">A remote Model Context Protocol server running on Cloudflare Workers. Connect any MCP-compatible AI client — like Claude — to use these tools directly.</p>

    <div class="endpoint-card">
      <div class="card-title">🔌 Endpoints</div>
      <div class="endpoint-row">
        <span class="method">SSE</span>
        <span class="endpoint-url">${url.origin}/sse</span>
        <span class="endpoint-desc">For Claude Desktop & MCP clients</span>
      </div>
      <div class="endpoint-row">
        <span class="method">HTTP</span>
        <span class="endpoint-url">${url.origin}/mcp</span>
        <span class="endpoint-desc">Streamable HTTP transport</span>
      </div>
    </div>

    <div class="card-title" style="margin-bottom:1rem;">🛠️ Available Tools</div>
    <div class="tools-grid">
      <div class="tool-item">
        <div class="tool-name">calculate</div>
        <div class="tool-desc">Evaluate math expressions like "2 + 2" or "10 * 5 / 2"</div>
      </div>
      <div class="tool-item">
        <div class="tool-name">cloudflare_info</div>
        <div class="tool-desc">Get info about Workers, Pages, D1, R2, KV, AI, or MCP</div>
      </div>
      <div class="tool-item">
        <div class="tool-name">get_joke</div>
        <div class="tool-desc">Returns a random developer joke</div>
      </div>
      <div class="tool-item">
        <div class="tool-name">count_words</div>
        <div class="tool-desc">Count words, characters, and sentences in any text</div>
      </div>
    </div>

    <div class="connect-card">
      <div class="connect-title">⚡ Connect Claude to this MCP Server</div>
      <div class="connect-step">
        <div class="step-num">1</div>
        <div class="step-text">Open <strong>Claude Desktop</strong> and go to <strong>Settings → Developer → Edit Config</strong></div>
      </div>
      <div class="connect-step">
        <div class="step-num">2</div>
        <div class="step-text">Add this to your <code>claude_desktop_config.json</code>:<br/><br/>
        <code>{ "mcpServers": { "cloudflare": { "url": "${url.origin}/sse" } } }</code></div>
      </div>
      <div class="connect-step">
        <div class="step-num">3</div>
        <div class="step-text"><strong>Restart Claude Desktop</strong> and look for the 🔌 tools icon in the chat input</div>
      </div>
      <div class="connect-step">
        <div class="step-num">4</div>
        <div class="step-text">Ask Claude to <strong>"calculate 123 * 456"</strong> or <strong>"tell me about Cloudflare Workers"</strong> and watch it use your tools!</div>
      </div>
    </div>
  </main>
</body>
</html>`, { headers: { "Content-Type": "text/html" } });
  }
};