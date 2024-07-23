import axios from 'axios';
import https from 'https';
import config from '../../../config/config';

const agent = new https.Agent({  
    rejectUnauthorized: false
});

export async function GET(request) {
    try {
        const response = await axios.get(config.VISITREPORTS, {
            httpsAgent: agent
        });

        return new Response(JSON.stringify(
            { message: "success", result: response.data }
        ), { status: 200 });

    } catch (error) {
        console.error("Error fetching visit reports:", error.message);
        return new Response(JSON.stringify(
            { message: "failed", result: [] }
        ), { status: 500 });
    }
}
