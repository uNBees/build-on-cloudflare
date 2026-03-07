import html from '../index.html';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };

    // Serve the frontend
    if (request.method === "GET" && url.pathname === "/") {
      return new Response(html, {
        headers: { "Content-Type": "text/html" },
      });
    }

    // GET - fetch all messages
    if (request.method === "GET" && url.pathname === "/messages") {
      const { results } = await env.DB.prepare(
        "SELECT * FROM messages ORDER BY created_at DESC LIMIT 50"
      ).all();
      return new Response(JSON.stringify(results), { headers });
    }

    // POST - save a new message
    if (request.method === "POST" && url.pathname === "/messages") {
      const { name, message } = await request.json();
      await env.DB.prepare(
        "INSERT INTO messages (name, message) VALUES (?, ?)"
      ).bind(name, message).run();
      return new Response(JSON.stringify({ success: true }), { headers });
    }

    return new Response("Not found", { status: 404 });
  },
};