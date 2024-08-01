'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import Styles from "../auth.module.scss";


const Forgotpassword = () => {
    const router = useRouter();
    // States
    const [formFields, setFormFields] = useState({
        txtFUsername: '',
      });
    const [errorMessage, setErrorMessage] = useState({
        apiErrorMsg : '',
        txtFUsernameErrorMsg : '',
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
        setErrorMessage((prev)=>({...prev, txtFUsernameErrorMsg: ''}));
        router.push('/login');
    }
    // Form submit
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            if(formFields.txtFUsername == ''){
                // Clear previous error messages
                setErrorMessage((prev)=>({...prev, apiErrorMsg : ''}));

                setErrorMessage((prev)=>({...prev, txtFUsernameErrorMsg: 'Enter User Name'}));
                return;
            }else{
                // Clear previous error messages
                setErrorMessage((prev)=>({...prev, txtFUsernameErrorMsg: ''}));
            }
            // ${process.env.NEXT_PUBLIC_APP_ENDPOINT}
            const response = await axios.post(`/api/auth/forgotPassword`,formFields);
            let responseData = response.data.result;
            if(responseData.length !==0){
                if(responseData.root?.status !== '0'){
                    // Clear previous error messages
                    setErrorMessage((prev)=>({...prev, apiErrorMsg : ''}));
                    // Send Username
                }else{
                    setErrorMessage((prev)=>({...prev, txtFUsernameErrorMsg: ''}));
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
            <div className={`${Styles.loginboxcntnt} ${Styles.forgotboxcntnt}`}>
                <div className={Styles.logintitle}>Forgot password</div>
                <form className={Styles.loginbox} onSubmit={handleSubmit}>
                {errorMessage.apiErrorMsg !=='' &&<span style={{color : 'red'}}>{errorMessage.apiErrorMsg}</span>}
                    <div className={Styles.mrgb10}>
                        <input
                        type="text" 
                        name="txtFUsername" 
                        className={Styles.inputtxt} 
                        placeholder="User Name"
                        onChange={handleChange}
                        />
                    </div>
                    {errorMessage.txtFUsernameErrorMsg !=='' &&<span style={{color : 'red'}}>{errorMessage.txtFUsernameErrorMsg}</span>}
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
