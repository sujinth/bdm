import axios from "axios";
import https from "https";
import config from "../../../../config/config";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export async function POST(request) {
  try {
    const formData = await request.formData();

    const response = await axios.post(
      `${config.POST_DEALERSHIP_VISIT_REPORT_RESPONSE}`,
      formData,
      {
        httpsAgent: agent,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return new Response(
      JSON.stringify({ message: "success", result: response.data }),
      {
        status: 200,
      }
    );
  } catch (err) {
    // console.log("errr->",err);
    return new Response(JSON.stringify({ message: "failed", result: [] }), {
      status: 500,
    });
  }
}
