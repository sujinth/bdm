                //////////////////////////////////////////////////////////////////////////////////       
                //                                                                              //           
                //         File for fetch API data from incomplete_updateactionstatus           //
                //                                                                              //
                //////////////////////////////////////////////////////////////////////////////////

import axios from 'axios';
import https from 'https';
import config from '../../../../config/config';

const agent = new https.Agent({  
    rejectUnauthorized: false
});

// Function for incomplete update action status
export async function POST(request) {
    try {
        const {userId, cartId, formId, dealershipId, strFormControlInfo, postData} = await request.json();

        // If no userId in request this will throw error
        if (!userId) {
            return new Response(JSON.stringify({message :"userId parameter is required."}), {status : 400});
        }

        // API request and response sending
        const response = await axios.post(`
            ${config.INCOMPLETE_UPDATEACTION_STATUS}?
            userid=${userId}&
            cartid=${cartId}&
            formid=${formId}&
            dealershipid=${dealershipId}&
            strFormControlInfo=${strFormControlInfo}&
            postdata=${postData}
        `,
        {},
        {
            httpsAgent: agent
        });
        
        return new Response(JSON.stringify(
            { message: "success", result: response.data }
        ), { status: 200 });

    } catch (error) {
        // Error case
        console.error("Error while updating action status :", error.message);
        return new Response(JSON.stringify(
            { message: "failed", result: [] }
        ), { status: 500 });
    }
}
