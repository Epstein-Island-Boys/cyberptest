// The website you want to proxy
const UPSTREAM = "https://example.com"; 

Deno.serve(async (req: Request) => {
  try {
    // 1. Get the path the user requested (e.g., /about or /images/logo.png)
    const url = new URL(req.url);
    
    // 2. Build the new target URL pointing to the upstream site
    const target = new URL(url.pathname + url.search, UPSTREAM);

    // 3. Copy the original headers but remove the "host" header
    // so fetch automatically uses the correct host for the upstream site.
    const headers = new Headers(req.headers);
    headers.delete("host");

    // 4. Fetch the target site
    const response = await fetch(target, {
      method: req.method,
      headers: headers,
      body: req.body,
      redirect: "manual", // Prevent Deno from automatically following redirects
    });

    // 5. Return the response back to the user
    return response;
  } catch (error) {
    return new Response("Error proxying request", { status: 500 });
  }
});
