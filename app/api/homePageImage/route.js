import axios from "axios";
import https from "https";
import config from "../../../config/config";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export async function POST(request) {
  try {
    const { userId, lastupdatedttm } = await request.json();

    const response = await axios.get(
      `${config.HOME_PAGE_IMG_URL}?userid=${userId}&lastupdatedttm=${lastupdatedttm}`,
      {
        httpsAgent: agent,
      }
    );

    return new Response(
      JSON.stringify({ message: "success", result: response.data.root }),
      { status: 200 }
    );
  } catch (error) {
    console.log("err - >", error.message);
    return new Response(JSON.stringify({ message: "failed", result: [] }), {
      status: 500,
    });
  }
}
