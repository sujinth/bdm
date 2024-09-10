import axios from "axios";
import https from "https";
import config from "../../../config/config";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export async function GET(request) {
  try {
    const response = await axios.get(config.HOME_PAGE_IMG_URL, {
      httpsAgent: agent,
    });

    console.log(response.data.root, "response 1 -----");

    return new Response(
      JSON.stringify({ message: "sucess", result: response.data.root }),
      { status: 200 }
    );
  } catch (error) {
    console.log("err - >", error.message);
    return new Response(JSON.stringify({ message: "faild", result: [] }), {
      status: 500,
    });
  }
}
