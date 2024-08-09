//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
//                           File for showing news data                         //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////

"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Styles from "./readMore.module.scss";

// Default function for read more component
const ReadMore = () => {
  const session = useSession();
  const [apiResponse, setApiResponse] = useState({});

  // For initial api function call
  useEffect(() => {
    getData();
  }, []);

  // Function for API call to next server for news
  async function getData() {
    try {
      let userId = session.data?.user?.id;
      if (!userId) {
        throw new Error("user id not found");
      }

      // API call
      const response = await axios.post(`/api/news`, {
        userId,
        lastupdatedttm: "2012-03-12 05:49:32",
        userguidelastupdatedttm: "2017-08-21 16:03:19",
      });

      // Setting data with status A in to a state
      if (
        response?.data?.result?.communication &&
        response?.data?.result?.communication?.length !== 0
      ) {
        let communicationArray = response.data.result.communication;
        for (let i = 0; i < communicationArray.length; i++) {
          if (communicationArray[i]?.status == "A") {
            setApiResponse(communicationArray[i]);
            break;
          }
        }
      }
    } catch (error) {
      console.log("error", error.message);
    }
  }
  return (
    <>
      <div className={Styles.detailNews}>
        <div className={Styles.mainTitle}>Communications</div>
        <div className={Styles.contentBox}>
          {apiResponse.title ? (
            <div className={Styles.title}>{apiResponse.title}</div>
          ) : null}

          {apiResponse.date ? (
            <div className={Styles.date}>{apiResponse.date}</div>
          ) : null}

          {apiResponse.desc ? (
            <div className={Styles.description}>{apiResponse.desc}</div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ReadMore;
