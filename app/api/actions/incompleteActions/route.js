                //////////////////////////////////////////////////////////////////////////////////       
                //                                                                              //           
                //          File for fetch API data from incomplete_reportlist                  //
                //                                                                              //
                //////////////////////////////////////////////////////////////////////////////////

import axios from 'axios';
import https from 'https';
import config from '../../../../config/config';

const agent = new https.Agent({  
    rejectUnauthorized: false
});

// Function for get incomplete action reports
export async function POST(request) {
    try {
        const {userId, lastupdatedttm, flagDealergroup, flagTabbedView, selectedFormId, dealerGroupId, flagHealthCheck} = await request.json();

        // If no userId in request this will throw error
        if (!userId) {
            return new Response(JSON.stringify({message :"userId parameter is required."}), {status : 400});
        }
        
        // API request and response sending
        const response = await axios.post(`
            ${config.INCOMPLETE_ACTION}?
            userid=${userId}&
            lastupdatedttm=${lastupdatedttm}&
            flagdealergroup=${flagDealergroup}&
            flagtabbedview=${flagTabbedView}&
            flagHealthCheck=${flagHealthCheck}&
            formid=${selectedFormId}&
            dealershipid=${dealerGroupId}
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
        console.error("Error while fetching incomplete action reports:", error.message);
        return new Response(JSON.stringify(
            { message: "failed", result: [] }
        ), { status: 500 });
    }
}
