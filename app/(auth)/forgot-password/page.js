'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import Styles from "../auth.module.scss";


const Forgotpassword = () => {
    const router = useRouter();
    // States
    const [formFields, setFormFields] = useState({
        txtFEmail: '',
      });
    const [errorMessage, setErrorMessage] = useState({
        apiErrorMsg : '',
        txtFEmailErrorMsg : '',
      });

    // Actions
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields((prevState) => ({
        ...prevState,
        [name]: value,
        }));
    };

    // Cancel btn
    const handleCancelbtn = () =>{
        setErrorMessage((prev)=>({...prev, txtFEmailErrorMsg: ''}));
        router.push('/login');
    }
    // Form submit
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            if(formFields.txtFEmail == ''){
                // Clear previous error messages
                setErrorMessage((prev)=>({...prev, apiErrorMsg : ''}));

                setErrorMessage((prev)=>({...prev, txtFEmailErrorMsg: 'Enter email'}));
                return;
            }else{
                // Clear previous error messages
                setErrorMessage((prev)=>({...prev, txtFEmailErrorMsg: ''}));
            }
            // ${process.env.NEXT_PUBLIC_APP_ENDPOINT}
            const response = await axios.post(`/api/auth/forgotPassword`,formFields);
            let responseData = response.data.result;
            if(responseData.length !==0){
                if(responseData.root?.status !== '0'){
                    // Clear previous error messages
                    setErrorMessage((prev)=>({...prev, apiErrorMsg : ''}));
                    // Send email
                }else{
                    setErrorMessage((prev)=>({...prev, txtFEmailErrorMsg: ''}));
                    setErrorMessage((prev)=>({...prev, apiErrorMsg : responseData?.root?.message}));
                }
            }
        }catch (error){
            // Handle error
            console.error("Login failed:", error);
        }
    }

    return (
        <div className={Styles.bgcolor}>
        <div  className={`${Styles.container} ${Styles.loginpg}`}>
            <div className={Styles.loginboxcntnt}>
                <form className={Styles.loginbox} onSubmit={handleSubmit}>
                {errorMessage.apiErrorMsg !=='' &&<span style={{color : 'red'}}>{errorMessage.apiErrorMsg}</span>}
                    <div className={Styles.mrgb10}>
                        <input
                        type="text" 
                        name="txtFEmail" 
                        className={Styles.inputtxt} 
                        placeholder="Email" 
                        onChange={handleChange}
                        />
                    </div>
                    {errorMessage.txtFEmailErrorMsg !=='' &&<span style={{color : 'red'}}>{errorMessage.txtFEmailErrorMsg}</span>}
                    <div className={Styles.mrgT40} >
                        <button className={Styles.loginbtn}  type='submit'>Send</button>
                    </div>
                    <div className={Styles.mrgT10} >
                    <input type="button" onClick={handleCancelbtn} value="Cancel" className={Styles.loginbtn} /></div>
                   
                </form>  
            </div>
        </div>
  </div>
    );
};

export default Forgotpassword;
