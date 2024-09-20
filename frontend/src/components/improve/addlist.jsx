// src/components/FileUpload.jsx

import React, { useState } from 'react';

const FileUpload = () => {
  const [response, setResponse] = useState(null);

  const handleUpload = async () => {
    try {
      const res = await fetch('https://api.handelexports.com/addlist', {
        method: 'POST',
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error fetching response:', error);
      setResponse({ error: 'Failed to get response' });
    }
  };

  return (
    <div>
      <h1>Upload CSV File</h1>
      <button onClick={handleUpload} clas>Fetch Response</button>
      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
