"use client";
import React, { useState } from "react";
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Styles from "../auth.module.scss";

const Login = () => {
  const router = useRouter();
  // States
  const [formFields, setFormFields] = useState({
    txtEmail: '',
    txtPassWord: '',
  });
  const [errorMessage, setErrorMessage] = useState({
    apiErrorMsg : '',
    txtEmailErrorMsg : '',
    txtPasswordErrorMsg : ''
  });


  // Actions
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if(formFields.txtEmail == '' || formFields.txtPassWord == ''){

            setErrorMessage((prev)=>({...prev,apiErrorMsg : ''}));
          if(formFields.txtEmail == ''){
            setErrorMessage((prev)=>({...prev, txtEmailErrorMsg: 'Enter email.'}));
          }else{
            // Clear previous error messages
            setErrorMessage((prev)=>({...prev, txtEmailErrorMsg: ''}));
          }
          if(formFields.txtPassWord == ''){
            setErrorMessage((prev)=>({...prev, txtPasswordErrorMsg: 'Enter password.'}));
          }else{
            // Clear previous error messages
            setErrorMessage((prev)=>({...prev, txtPasswordErrorMsg: ''}));
          }
          return; 
      }
      // Clear previus state
      setErrorMessage((prev) => ({
        ...prev,
        txtEmailErrorMsg: '',
        txtPasswordErrorMsg: '',
      }));
      // Signin functionality 
      const response  = await signIn('credentials', {
        txtEmail : formFields.txtEmail,
        txtPassWord : formFields.txtPassWord,
        redirect : false
      })
      if (response?.error) {
          // Clear previous error messages
          setErrorMessage((prev)=>({...prev, txtEmailErrorMsg: ''}));
          setErrorMessage((prev)=>({...prev, txtPasswordErrorMsg: ''}));

          setErrorMessage((prev)=>({...prev,apiErrorMsg : response?.error}));
      }else{
          setErrorMessage((prev)=>({...prev,apiErrorMsg : ''}));
          router.push('/home');
          
          // router.refresh();
      }

    } catch (error) {
      // Handle error
      console.error("Login failed:", error);
    }
  };

  return (
    <div className={Styles.bgcolor}>
      <div className={`${Styles.container} ${Styles.loginpg}`}>
      
        <div className={Styles.loginboxcntnt}>
          <form className={Styles.loginbox} onSubmit={handleSubmit}>
            {errorMessage.apiErrorMsg !=='' &&<span style={{color : 'red'}}>{errorMessage.apiErrorMsg}</span>}
            <div className={Styles.mrgb10}>
              <input
                type="text"
                name="txtEmail"
                className={Styles.inputtxt}
                placeholder="Email"
                onChange={handleChange}
              />   
            </div>
            {errorMessage.txtEmailErrorMsg !=='' &&<span style={{color : 'red'}}>{errorMessage.txtEmailErrorMsg}</span>}
            <div>
              <input
                type="password"
                name="txtPassWord"
                className={Styles.inputtxt}
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            {errorMessage.txtPasswordErrorMsg !=='' &&<span style={{color : 'red'}}>{errorMessage.txtPasswordErrorMsg}</span>}
            <div className={Styles.mrgT40}>
              <input type="submit" value="Login" className={Styles.loginbtn} />
            </div>
            <div className={`${Styles.txtcntr} ${Styles.mrgT20}`}>
            <Link className={Styles.frgtlnk} href="/forgot-password">Forgot password ?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
