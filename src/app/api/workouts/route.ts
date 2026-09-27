import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id && !/^[a-zA-Z0-9_-]+$/.test(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const url = id
      ? `https://api.api-store.workers.dev/api/fitlog/${id}`
      : " https://api.api-store.workers.dev/api/fitlog";

    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json(
        { error: `External worker failed with status ${response.status}` },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
