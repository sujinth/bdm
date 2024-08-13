//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
//                      File for fetch API data from news                       //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////

import axios from "axios";
import https from "https";
import config from "../../../config/config";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

// Function for fetch news api data
export async function POST(request) {
  try {
    const { userId, lastupdatedttm, userguidelastupdatedttm } =
      await request.json();

    // Create a new FormData instance
    const formData = new FormData();
    formData.append("userid", userId);
    formData.append("lastupdatedttm", lastupdatedttm);
    formData.append("userguidelastupdatedttm", userguidelastupdatedttm);

    // If no userId in request, return an error response
    if (!userId) {
      return new Response(
        JSON.stringify({ message: "userId parameter is required." }),
        { status: 400 }
      );
    }

    // API request and response sending
    const response = await axios.post(`${config.NEWS}`, formData, {
      httpsAgent: agent,
    });

    return new Response(
      JSON.stringify({ message: "success", result: response.data }),
      { status: 200 }
    );
  } catch (error) {
    // Error case
    console.error("Error fetching data from news api :", error.message);
    return new Response(JSON.stringify({ message: "failed", result: [] }), {
      status: 500,
    });
  }
}
