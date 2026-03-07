import html from '../index.html';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Serve the frontend
    if (request.method === "GET" && url.pathname === "/") {
      return new Response(html, {
        headers: { "Content-Type": "text/html" },
      });
    }

    // POST - chat with AI
    if (request.method === "POST" && url.pathname === "/chat") {
      const { messages } = await request.json();

      const response = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant called CloudflareBot. You help developers learn about the Cloudflare developer platform including Workers, Pages, D1, R2, KV, and Workers AI. Keep responses concise and friendly."
          },
          ...messages
        ],
      });

      return new Response(JSON.stringify({ reply: response.response }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("Not found", { status: 404 });
  },
};