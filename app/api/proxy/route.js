import axios from "axios";
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");
    if (!url) {
      return new Response(
        JSON.stringify({ message: "URL parameter is required." }),
        { status: 400 }
      );
    }

    const response = await axios.get(url, {
      httpsAgent: agent,
      responseType: "arraybuffer",
    });
    const headers = new Headers();
    headers.append("Content-Type", "application/pdf");
    // headers.append('Content-Disposition', 'inline');
    return new Response(response.data, {
      status: 200,
      headers,
    });
  } catch (err) {
    console.log("errr->", err);
    return new Response(JSON.stringify({ message: "faild", result: [] }), {
      status: 500,
    });
  }
}
