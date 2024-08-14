//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
//                       File for showing home page                             //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import InnerHeader from "../components/commen/InnerHeader/Header";
import Footer from "../components/commen/Footer/Footer";
import Loader from "../components/commen/Loader/Loader";
import { useSession } from "next-auth/react";
// Style
import Styles from "./home.module.scss";
import axios from "axios";

// Home component
const Home = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [apiResponse, setApiResponse] = useState({});
  const session = useSession();

  // useEffect for triger fetch home page data function
  useEffect(() => {
    fetchImagUrlForHomePage();
    getData();
  }, [session]);

  // Function for fetch image url
  async function fetchImagUrlForHomePage() {
    try {
      const response = await axios.get("api/homePageImage");
      if (response.data.result.status !== 0) {
        setImageUrl(response.data.result.data.content1);
      }
    } catch (error) {
      console.log("error ->", error.message);
    }
  }

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
      {/* Header */}
      <InnerHeader />
      {imageUrl ? 
        <div className={Styles.homeImage} dangerouslySetInnerHTML={{ __html: imageUrl }} /> :
        <Loader />
      }
      <div className={Styles.bgcolor}>
        <div className={Styles.container}>
          <div className={Styles.pdTB70}>
            <div className={Styles.flex}>
              <div
                className={`${Styles.whtbg} ${Styles.pd20} ${Styles.rghtbxcntnt} ${Styles.brdgry} ${Styles.brdradius}`}
              >
                <div>
                  <div
                    className={`${Styles.notificationtitle} ${Styles.pdB10} `}
                  >
                    Notifications
                  </div>
                  <div
                    className={`${Styles.fntw700} ${Styles.pdTB10}  ${Styles.subtitle} `}
                  >
                    {apiResponse.title}
                  </div>
                  
                  <div className={Styles.fntclgry}>{apiResponse.date}</div>
                  <div>{apiResponse.desc}</div>
                </div>
              </div>
            </div>

            <div className={`${Styles.flex} ${Styles.pdT50}  ${Styles.clgp20}`}>
              <div className={Styles.cntntbox}>
                  <div
                    className={`${Styles.boxtile} ${Styles.brdradius} `}
                  >
                    <div
                      className={Styles.iconbrborderradius}>
                      <img
                        className={Styles.pd10}
                        src="/report.svg"
                        alt="report"
                      />
                    </div>
                    <Link href="/visit-reports"
                      className={`${Styles.tilebtn} ${Styles.whttxt} ${Styles.pd10} ${Styles.fntw600}`}
                    >
                      Visit Reports
                    </Link>
                  </div>
               
              </div>

              <div className={Styles.cntntbox}>
                
                <div
                    className={`${Styles.boxtile} ${Styles.brdradius} ${Styles.actionbox}`}
                  >
                    <div
                      className={Styles.iconbrborderradius}>
                      <img
                        className={Styles.pd10}
                        src="/action.png"
                        alt="Actions"
                      />
                    </div>
                    <Link href="/actions"
                      className={`${Styles.tilebtn} ${Styles.whttxt} ${Styles.pd10} ${Styles.fntw600}`}
                    >
                      Actions
                    </Link>
                  </div>
                
              </div>

              <div className={Styles.cntntbox}>
                <div
                    className={`${Styles.boxtile} ${Styles.brdradius} `}
                  >
                    <div
                      className={Styles.iconbrborderradius}>
                      <img
                        className={Styles.pd10}
                        src="/communication.svg"
                        alt="Coaching"
                      />
                    </div>
                    <Link href="https://santander.learnondemand.co.uk/login/"
                      className={`${Styles.tilebtn} ${Styles.whttxt} ${Styles.pd10} ${Styles.fntw600}`}
                    >
                      Coaching
                    </Link>
                  </div>
              </div>

              <div className={Styles.cntntbox}>
                
                <div
                    className={`${Styles.boxtile} ${Styles.brdradius} `}
                  >
                    <div
                      className={Styles.iconbrborderradius}>
                      <img
                        className={Styles.pd10}
                        src="/resources.svg"
                        alt="report"
                      />
                    </div>
                    <Link href="/resources"
                      className={`${Styles.tilebtn} ${Styles.whttxt} ${Styles.pd10} ${Styles.fntw600}`}
                    >
                      Resources
                    </Link>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
