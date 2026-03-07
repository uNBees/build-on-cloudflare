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

    // GET - redirect short link
    if (request.method === "GET" && url.pathname.length > 1) {
      const code = url.pathname.slice(1);
      const destination = await env.LINKS.get(code);
      if (!destination) {
        return new Response("Link not found", { status: 404 });
      }
      return Response.redirect(destination, 302);
    }

    // POST - create short link
    if (request.method === "POST" && url.pathname === "/shorten") {
      const { longUrl } = await request.json();
      if (!longUrl) return new Response("No URL provided", { status: 400 });
      const code = Math.random().toString(36).slice(2, 7);
      await env.LINKS.put(code, longUrl);
      const shortUrl = `${url.origin}/${code}`;
      return new Response(JSON.stringify({ shortUrl, code }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // GET - list all links
    if (request.method === "GET" && url.pathname === "/links") {
      const list = await env.LINKS.list();
      const links = await Promise.all(
        list.keys.map(async (key) => ({
          code: key.name,
          destination: await env.LINKS.get(key.name),
        }))
      );
      return new Response(JSON.stringify(links), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // DELETE - remove a link
    if (request.method === "DELETE" && url.pathname.startsWith("/links/")) {
      const code = url.pathname.replace("/links/", "");
      await env.LINKS.delete(code);
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("Not found", { status: 404 });
  },
};