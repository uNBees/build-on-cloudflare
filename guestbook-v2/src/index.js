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

    // POST - save a new message (with Turnstile verification)
    if (request.method === "POST" && url.pathname === "/messages") {
      const { name, message, token } = await request.json();

      // Verify Turnstile token
      const formData = new FormData();
      formData.append("secret", env.TURNSTILE_SECRET_KEY);
      formData.append("response", token);
      formData.append("remoteip", request.headers.get("CF-Connecting-IP"));

      const turnstileRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        { method: "POST", body: formData }
      );
      const turnstileData = await turnstileRes.json();

      if (!turnstileData.success) {
        return new Response(
          JSON.stringify({ success: false, error: "Turnstile verification failed" }),
          { headers, status: 403 }
        );
      }

      // Save message to D1
      await env.DB.prepare(
        "INSERT INTO messages (name, message) VALUES (?, ?)"
      ).bind(name, message).run();

      return new Response(JSON.stringify({ success: true }), { headers });
    }

    return new Response("Not found", { status: 404 });
  },
};