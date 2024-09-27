"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Styles from "../auth.module.scss";

const Updatepassword = () => {
  const router = useRouter();
  const session = useSession();
  // States
  const [formFields, setFormFields] = useState({
    txtNPassword: "",
    txtCPassword: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    apiErrorMsg: "",
    apiSuccessMsg: "",
    txtNPasswordErrorMsg: "",
    txtCPasswordErrorMsg: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "txtNPassword") {
      if (value.includes(" ")) {
        setErrorMessage((prev) => ({
          ...prev,
          txtNPasswordErrorMsg: "Spaces are not allowed.",
        }));
        return;
      } else {
        setErrorMessage((prev) => ({ ...prev, txtNPasswordErrorMsg: "" }));
      }
      if (value && value.length < 8) {
        setErrorMessage((prev) => ({
          ...prev,
          txtNPasswordErrorMsg: "Password must contain at least 8 characters.",
        }));
      } else {
        setErrorMessage((prev) => ({ ...prev, txtNPasswordErrorMsg: "" }));
      }
    }
    if (name == "txtCPassword") {
      if (value.includes(" ")) {
        setErrorMessage((prev) => ({
          ...prev,
          txtCPasswordErrorMsg: "Spaces are not allowed.",
        }));
        return;
      } else {
        setErrorMessage((prev) => ({ ...prev, txtCPasswordErrorMsg: "" }));
      }
      if (value && value.length < 8) {
        setErrorMessage((prev) => ({
          ...prev,
          txtCPasswordErrorMsg: "Password must contain at least 8 characters.",
        }));
      } else {
        setErrorMessage((prev) => ({ ...prev, txtCPasswordErrorMsg: "" }));
      }
    }
    setFormFields((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSuccessMessage("");
      if (
        errorMessage.txtNPasswordErrorMsg == "" &&
        errorMessage.txtCPasswordErrorMsg == ""
      ) {
        if (formFields.txtNPassword == "" || formFields.txtCPassword == "") {
          setErrorMessage((prev) => ({ ...prev, apiErrorMsg: "" }));
          if (formFields.txtNPassword == "") {
            setErrorMessage((prev) => ({
              ...prev,
              txtNPasswordErrorMsg: "Please enter new password.",
            }));
          } else {
            // Clear previous error messages
            setErrorMessage((prev) => ({ ...prev, txtNPasswordErrorMsg: "" }));
          }
          if (formFields.txtCPassword == "") {
            setErrorMessage((prev) => ({
              ...prev,
              txtCPasswordErrorMsg: "Please enter confirm password.",
            }));
          } else {
            // Clear previous error messages
            setErrorMessage((prev) => ({ ...prev, txtCPasswordErrorMsg: "" }));
          }
          return;
        }
        // Clear previus state
        setErrorMessage((prev) => ({
          ...prev,
          txtNPasswordErrorMsg: "",
          txtCPasswordErrorMsg: "",
        }));
        if (formFields.txtNPassword == formFields.txtCPassword) {
          setErrorMessage((prev) => ({ ...prev, apiErrorMsg: "" }));

          if (!session.data?.user?.id) {
            throw new Error("User id is missing.");
          }
          let requestBody = {
            userId: session.data?.user?.id,
            txtCPassword: formFields.txtCPassword,
          };
          const response = await axios.post(
            `/api/auth/updatePassword`,
            requestBody
          );
          let responseData = response.data.result;

          if (responseData.length !== 0) {
            if (responseData.root?.status !== "0") {
              // Clear previous error messages
              setErrorMessage((prev) => ({ ...prev, apiErrorMsg: "" }));
              setSuccessMessage(responseData.root.message);
              router.push("/home");
            } else {
              setErrorMessage((prev) => ({
                ...prev,
                txtNPasswordErrorMsg: "",
              }));
              setErrorMessage((prev) => ({
                ...prev,
                txtCPasswordErrorMsg: "",
              }));
              setErrorMessage((prev) => ({
                ...prev,
                apiErrorMsg: responseData?.root?.message,
              }));
            }
          }
        } else {
          setErrorMessage((prev) => ({
            ...prev,
            apiErrorMsg:
              "New password and confirm password do not match. Please try again.",
          }));
        }
      }
    } catch (error) {
      // Handle error
      console.error("Login failed:", error);
    }
  };
  const handleCancelbtn = () => {
    setErrorMessage((prev) => ({ ...prev, txtFEmailErrorMsg: "" }));
    router.push("/home");
  };

  return (
    <div className={Styles.bgcolor}>
      <div className={`${Styles.container} ${Styles.loginpg} ${Styles.updatepasswordpg}`}>
        <div className={`${Styles.loginboxcntnt} ${Styles.updateboxcntnt}`}>
          <form className={Styles.loginbox} onSubmit={handleSubmit}>
            {errorMessage.apiErrorMsg !== "" && (
              <span style={{ color: "red" }}>{errorMessage.apiErrorMsg}</span>
            )}
            {successMessage !== "" && (
              <span style={{ color: "green" }}>{successMessage}</span>
            )}
            <div className={Styles.mrgb10}>
              <label className={Styles.inputlabel}>New Password</label>
              <input
                type="password"
                name="txtNPassword"
                className={Styles.inputtxt}
                onChange={handleChange}
              />
               {errorMessage.txtNPasswordErrorMsg !== "" && (
              <span style={{ color: "red" }}>
                {errorMessage.txtNPasswordErrorMsg}
              </span>
            )}
            </div>
           
            <div>
            <label className={Styles.inputlabel}>Confirm Password</label>
              <input
                type="password"
                name="txtCPassword"
                className={Styles.inputtxt}
                onChange={handleChange}
              />
            </div>
            {errorMessage.txtCPasswordErrorMsg !== "" && (
              <span style={{ color: "red" }}>
                {errorMessage.txtCPasswordErrorMsg}
              </span>
            )}
            <div className={Styles.mrgT40}>
              <input
                type="submit"
                value="Change Password"
                className={Styles.loginbtn}
              />
            </div>
            <div className={Styles.mrgT10}>
              <input
                type="button"
                onClick={handleCancelbtn}
                value="Cancel"
                className={Styles.loginbtn}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Updatepassword;
