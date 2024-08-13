import axios from "axios";
import https from 'https';
import config from '../../../../config/config';

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export async function POST(request) {
  try {
    const { userId } = await request.json();
    console.log("--------------BEFORE---------------");

    let obj = {
      flagdealergroup: "Y",
      flagtabbedview: "Y",
      flagHealthCheck: "N",
      formid: "65",
      dealershipid: "353",
    };
    let formData = new FormData();
    for (let key in obj) {
      formData.append(key, obj[key]);
    }
    const response = await axios.post(
      `${config.DEALERSHIP_VISIT_REPORT_LIST}?userid=${246}`,
      formData,
      {
        httpsAgent: agent,
      }
    );
    console.log("--------------AFTER---------------");
    return new Response(
      JSON.stringify({ message: "success", result: response.data?.root }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log("errr->", err);
    return new Response(JSON.stringify({ message: "faild", result: [] }), {
      status: 500,
    });
  }
}
