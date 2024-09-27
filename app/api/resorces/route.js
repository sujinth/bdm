import axios from "axios";
import https from "https";
import config from "../../../config/config";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export async function POST(request) {
  try {
    const { userId } = await request.json();
    const response = await axios.get(
      `${config.RESOURCE}?userid=${userId}&flagApp=Y&lastupdatedttm=2012-03-12 05:49:32`,
      {
        httpsAgent: agent,
      }
    );

    return new Response(
      JSON.stringify({ message: "success", result: response.data?.resources }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log("errr->", err);
    return new Response(JSON.stringify({ message: "failed", result: [] }), {
      status: 500,
    });
  }
}
