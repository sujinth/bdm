//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
//                    File for showing excel file in resources                  //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import axios from "axios";

// Default function for excel viewer
const ExcelViewer = ({ file }) => {
  const [data, setData] = useState([]);

  // Function for get data from api proxy
  useEffect(() => {
    const fetchData = async () => {
      if (file) {
        try {
          const response = await axios.post("/api/proxy", file, {
            responseType: "arraybuffer",
          }); // Adjust endpoint if needed
          const arrayBuffer = response.data; // Response is expected to be an ArrayBuffer
          const workbook = XLSX.read(arrayBuffer, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          setData(json);
        } catch (error) {
          console.error("Error reading Excel file:", error);
        }
      }
    };

    fetchData();
  }, [file]);

  return (
    <div>
      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                {Object.values(row).map((value, colIdx) => (
                  <td key={colIdx}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data to display</p>
      )}
    </div>
  );
};

export default ExcelViewer;
