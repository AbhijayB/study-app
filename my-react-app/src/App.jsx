import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import UploadPage from "./uploadPage.jsx";
import DetailsPage from "./details.jsx";
import {Routes, Route} from "react-router-dom";

function App() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [details, setDetails] = useState(Array(3).fill(null));

  return (  
      <Routes>
        <Route path="/" element={<UploadPage text={text} setText={setText} file={file} setFile={setFile}/>}/>
        <Route path="/details" element={<DetailsPage details={details} setDetails={setDetails} text={text} setText={setText} file={file} setFile={setFile}/>}/>
      </Routes>
  )
}

export default App
