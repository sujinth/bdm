"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Styles from "../auth.module.scss";

const Login = () => {
  const router = useRouter();
  // States
  const [formFields, setFormFields] = useState({
    txtUsername: "",
    txtPassWord: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    apiErrorMsg: "",
    txtUsernameErrorMsg: "",
    txtPasswordErrorMsg: "",
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
      if (formFields.txtUsername == "" || formFields.txtPassWord == "") {
        setErrorMessage((prev) => ({ ...prev, apiErrorMsg: "" }));
        if (formFields.txtUsername == "") {
          setErrorMessage((prev) => ({
            ...prev,
            txtUsernameErrorMsg: "Enter User Name.",
          }));
        } else {
          // Clear previous error messages
          setErrorMessage((prev) => ({ ...prev, txtUsernameErrorMsg: "" }));
        }
        if (formFields.txtPassWord == "") {
          setErrorMessage((prev) => ({
            ...prev,
            txtPasswordErrorMsg: "Enter password.",
          }));
        } else {
          // Clear previous error messages
          setErrorMessage((prev) => ({ ...prev, txtPasswordErrorMsg: "" }));
        }
        return;
      }
      // Clear previus state
      setErrorMessage((prev) => ({
        ...prev,
        txtUsernameErrorMsg: "",
        txtPasswordErrorMsg: "",
      }));
      // Signin functionality
      const response = await signIn("credentials", {
        txtUserName: formFields.txtUsername,
        txtPassWord: formFields.txtPassWord,
        redirect: false,
      });
      if (response?.error) {
        // Clear previous error messages
        setErrorMessage((prev) => ({ ...prev, txtUsernameErrorMsg: "" }));
        setErrorMessage((prev) => ({ ...prev, txtPasswordErrorMsg: "" }));

        setErrorMessage((prev) => ({ ...prev, apiErrorMsg: response?.error }));
      } else {
        setErrorMessage((prev) => ({ ...prev, apiErrorMsg: "" }));
        router.push("/home");

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
            {errorMessage.apiErrorMsg !== "" && (
              <span style={{ color: "red" }}>{errorMessage.apiErrorMsg}</span>
            )}
            <div className={Styles.mrgb10}>
              <input
                type="text"
                name="txtUsername"
                className={Styles.inputtxt}
                placeholder="User Name"
                onChange={handleChange}
              />
            </div>
            {errorMessage.txtUsernameErrorMsg !== "" && (
              <span style={{ color: "red" }}>
                {errorMessage.txtUsernameErrorMsg}
              </span>
            )}
            <div>
              <input
                type="password"
                name="txtPassWord"
                className={Styles.inputtxt}
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            {errorMessage.txtPasswordErrorMsg !== "" && (
              <span style={{ color: "red" }}>
                {errorMessage.txtPasswordErrorMsg}
              </span>
            )}
            <div className={Styles.mrgT40}>
              <input type="submit" value="Login" className={Styles.loginbtn} />
            </div>
            <div className={`${Styles.txtcntr} ${Styles.mrgT20}`}>
              <Link className={Styles.frgtlnk} href="/forgot-password">
                Forgot password ?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
