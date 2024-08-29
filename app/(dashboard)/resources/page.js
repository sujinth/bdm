//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
//                           File for listing resources                         //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////

"use client";
import Link from "next/link";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Styles from "./resources.module.scss";
import Loader from "@/app/components/commen/Loader/Loader";

// Function for resources main component
const Resources = () => {
  const session = useSession();
  const [resorcesList, setResourcesList] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);

  // If any changes happen in session below useEffect will render
  useEffect(() => {
    getResources();
  }, [session.data?.user?.id]);

  // Function for fetch resorces
  async function getResources() {
    try {
      let userId = session.data?.user?.id;
      if (!userId) {
        throw new Error("User id not found.");
      }
      setResourcesList([]);
      setPageLoader(true);
      const response = await axios.post("/api/resorces", { userId: userId });
      setPageLoader(false);
      if (response.data.result?.length !== 0) {
        let filterResourcesList = response.data?.result?.filter(
          (item) => item?.type == "resourcelist"
        );
        // Sorting base on the name
        filterResourcesList.sort((a, b) => a.name.localeCompare(b.name));
        setResourcesList(filterResourcesList);
      }
    } catch (error) {
      console.log(error.message);
      if (error.message != "User id not found.") {
        setPageLoader(false);
      }
    }
  }
  return (
    <div className={Styles.bgcolor}>
      <div className={`${Styles.container} ${Styles.innerpgcntnt} `}>
        <div className={Styles.visitnamebx}>
          <div className={Styles.titlebx}>Visit Name</div>
          <div className={Styles.listitems}>
            {pageLoader ? <Loader /> : null}
            {false ? (
              <ul className={Styles.listcntnt}>
                {resorcesList?.map((item, idx) => (
                  <li key={idx}>
                    <Link href={`/resources/${item?.id}`}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className={Styles.nodata}>No data available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
