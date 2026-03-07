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

    // GET - return current count
    if (request.method === "GET" && url.pathname === "/count") {
      const count = await env.COUNTER.get("pageviews") || "0";
      return new Response(JSON.stringify({ count: parseInt(count) }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // POST - increment count
    if (request.method === "POST" && url.pathname === "/increment") {
      const current = parseInt(await env.COUNTER.get("pageviews") || "0");
      const newCount = current + 1;
      await env.COUNTER.put("pageviews", newCount.toString());
      return new Response(JSON.stringify({ count: newCount }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("Not found", { status: 404 });
  },
};