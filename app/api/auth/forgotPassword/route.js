import axios from "axios";
import https from 'https';
import config from '../../../../config/config';

const agent = new https.Agent({  
    rejectUnauthorized: false
});
    
export async function POST(request) {
    try{
        const {txtFEmail} = await request.json();
        const response  = await axios.post(`${config.FORGOT_PASSWORD}?txtFEmail=${txtFEmail}`,{},{
            httpsAgent: agent
        });
        return new Response(JSON.stringify(
            { message: 'success' , result  : response.data}), {
              status: 200, 
          });
    }catch(err){
        console.log("errr->",err);
        return new Response(JSON.stringify(
            { message: 'faild', result : []}), {
              status: 500, 
          });
    }
}