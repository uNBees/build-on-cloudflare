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

    // GET - list all images
    if (request.method === "GET" && url.pathname === "/images") {
      const list = await env.BUCKET.list();
      const images = list.objects.map(obj => ({
        key: obj.key,
        size: obj.size,
        uploaded: obj.uploaded,
      }));
      return new Response(JSON.stringify(images), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // GET - serve an individual image
    if (request.method === "GET" && url.pathname.startsWith("/images/")) {
      const key = url.pathname.replace("/images/", "");
      const object = await env.BUCKET.get(key);
      if (!object) return new Response("Not found", { status: 404 });
      return new Response(object.body, {
        headers: { "Content-Type": object.httpMetadata?.contentType || "image/jpeg" },
      });
    }

    // POST - upload an image
    if (request.method === "POST" && url.pathname === "/upload") {
      const formData = await request.formData();
      const file = formData.get("image");
      if (!file) return new Response("No file", { status: 400 });
      const key = `${Date.now()}-${file.name}`;
      await env.BUCKET.put(key, file.stream(), {
        httpMetadata: { contentType: file.type },
      });
      return new Response(JSON.stringify({ success: true, key }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // DELETE - remove an image
    if (request.method === "DELETE" && url.pathname.startsWith("/images/")) {
      const key = url.pathname.replace("/images/", "");
      await env.BUCKET.delete(key);
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("Not found", { status: 404 });
  },
};