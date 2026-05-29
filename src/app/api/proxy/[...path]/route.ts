import type { NextRequest } from "next/server";

const UPSTREAM = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/proxy/[...path]">,
) {
  if (!UPSTREAM) {
    return Response.json(
      { error: "NEXT_PUBLIC_API_BASE_URL not configured" },
      { status: 500 },
    );
  }
  const { path } = await ctx.params;
  const segments = Array.isArray(path) ? path : [path];
  const target = new URL(`${UPSTREAM}/${segments.join("/")}`);
  req.nextUrl.searchParams.forEach((v, k) => target.searchParams.set(k, v));

  try {
    const r = await fetch(target.toString(), {
      headers: { Accept: "application/json" },
      next: { revalidate: 120 },
    });
    const ct = r.headers.get("Content-Type") ?? "";
    const body = await r.text();
    if (!ct.includes("application/json")) {
      return Response.json(
        {
          error: "Upstream returned non-JSON",
          status: r.status,
          upstream_content_type: ct,
        },
        { status: r.ok ? 502 : r.status },
      );
    }
    return new Response(body, {
      status: r.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return Response.json(
      { error: "Upstream fetch failed", detail: (e as Error).message },
      { status: 502 },
    );
  }
}
