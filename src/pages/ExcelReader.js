import React, { useState } from "react";
import * as XLSX from "xlsx";

function ExcelReader() {
  const [data, setData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      // Parse data
      const data = new Uint8Array(evt.target.result);
      const wb = XLSX.read(data, { type: "array" });
      // Get first worksheet
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      // Convert array of arrays
      const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      // Update state
      setData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  console.log(data);

  return (
    <div>
      <input type="file" accept=".xlsx,.xls" onChange={handleFileUpload} />
      {/* Display data from state */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default ExcelReader;
