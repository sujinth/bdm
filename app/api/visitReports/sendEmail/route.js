import axios from "axios";
import https from "https";
import config from "../../../../config/config";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export async function POST(request) {
  try {
    const { body } = await request.json();

    let formData = new FormData();
    for (let key in body) {
      formData.append(key, body[key]);
    }

    const response = await axios.post(
      `${config.VISIT_REPORT_SEND_EMAIL}`,
      formData,
      {
        httpsAgent: agent,
      }
    );

    return new Response(
      JSON.stringify({ message: "success", result: response.data }),
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
