// app/api/proxy/route.ts
import { NextResponse } from "next/server";
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export async function POST(request) {
  try {
    const fileUrlData = await request.json();
    let fileUrl = fileUrlData.path;
    const response = await fetch(fileUrl, { agent });
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    const headers = new Headers();
    headers.set(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    return new NextResponse(Buffer.from(buffer), { headers });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch the file." }),
      { status: 500 }
    );
  }
}
