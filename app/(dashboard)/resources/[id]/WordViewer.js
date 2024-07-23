import React, { useState, useEffect } from 'react';
import mammoth from 'mammoth'; 

const WordViewer = ({ files }) => {
  const [htmlContents, setHtmlContents] = useState([]);

  useEffect(() => {
    const fetchWordFiles = async () => {
      try {
        const htmlContentPromises = files.map(async (file) => {
          const response = await fetch(file.path);
          const arrayBuffer = await response.arrayBuffer();
          const result = await mammoth.convertToHtml({ arrayBuffer });
          return result.value;
        });

        const htmlContents = await Promise.all(htmlContentPromises);
        setHtmlContents(htmlContents);
      } catch (error) {
        console.error('Error converting docx to HTML:', error);
      }
    };

    fetchWordFiles();
  }, [files]);

  return (
    <div>
      {htmlContents.map((htmlContent, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: htmlContent }} />
      ))}
    </div>
  );
};

export default WordViewer;
