import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const ExcelViewer = ({ files }) => {
  const [excelDataArray, setExcelDataArray] = useState([]);

  const fetchFileData = async (filePath) => {
    try {
      const response = await fetch(filePath);
      const arrayBuffer = await response.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      return jsonData;
    } catch (error) {
      console.error(`Error reading Excel file (${filePath}):`, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const dataPromises = files.map(async (file) => {
        const jsonData = await fetchFileData(file.path);
        return { name: file.name, data: jsonData };
      });

      const excelDataArray = await Promise.all(dataPromises);
      setExcelDataArray(excelDataArray);
    };

    fetchData();
  }, [files]);

  return (
    <div>
      {excelDataArray.map((file, index) => (
        <div key={index}>
          <table>
            <thead>
              <tr>
                {file.data?.[0]?.map((cell, cellIndex) => (
                  <th key={cellIndex}>{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {file.data?.slice(1)?.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ExcelViewer;
