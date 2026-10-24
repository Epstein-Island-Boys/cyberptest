Deno.serve(async (req) => {
  try {
    const file = await Deno.readFile("./index.html");
    return new Response(file, {
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    });
  } catch (e) {
    return new Response("404 - index.html not found", { status: 404 });
  }
});
