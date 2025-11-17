import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css'
import { useRef } from 'react';
import {useNavigate} from "react-router-dom";


// White - F7FFF7
// Yellow - FFE66D
// Dark Grey - 495867
// Light Red - FF6B6B
// Teal - 4ECDC4

function chooseText(file) {
  if (file === null) {
    return "Choose File";
  }
  return "1 File Selected";
}

function UploadButton({file, setFile, fileInputRef}) {
  
  return(
    <>
      <label htmlFor="fileUpload" className="customUploadButton">
          <svg 
            width="24" 
            height="24" 
            fill="white" 
            viewBox="0 0 24 24"
          >
            <path d="M5 20h14v-2H5m14-6-7-7-7 7h4v4h6v-4h4Z" />
          </svg>
          <span>{chooseText(file)}</span>
          <span>.pdf or .docx</span>
      </label>
      <br/>
      <input 
        ref = {fileInputRef}
        id="fileUpload"
        type="file"
        accept=".pdf, .docx"
        style={{ display: "none" }}
        onChange={(e) => {
          const selectedFile = e.target.files[0];
          setFile(selectedFile);
        }}
      />
    </>
  );
}

function TextInput({textValue, setText}) {
  return (
    <>
      <textarea
        className="textInput"
        placeholder="Type here..."
        rows={13}
        value = {textValue}
        onChange = {(e) => setText(e.target.value)}
        onKeyDown = {(e) => {
          if (e.key === "Enter") {
            e.stopPropagation();  
          }
        }}
      />
    </>
  )  
}


function UploadPage({text, setText, file, setFile}) {
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const sayHello = (e) => {
        e.preventDefault();
        if (file) {
          // You can add file processing logic here if needed
          const ext = file.name.split('.').pop().toLowerCase();
          if (!["pdf", "docx"].includes(ext)) {
            setFile(null);
            fileInputRef.current.value = null;
            alert("Unsupported file type. Please upload a PDF or DOCX file.");
            return;
          }
        }

        if (text.trim() !== "" || file !== null) {
            navigate("/details");
        } else {
            alert("Please enter some text or select a file before uploading.");
        }
    };
    return (
    <>
      <div>
        <form className = "container" onSubmit = {sayHello}>
          <div style = {{ fontFamily: "'Roboto', sans-serif", fontSize: "28px", color: "black", width: "230px" , marginTop: "50px", marginBottom: "20px"}}><strong> Upload your Notes</strong></div>
          <UploadButton file = {file} setFile = {setFile} fileInputRef={fileInputRef} />
          <div style = {{color: "black"}}>OR</div>
          <TextInput textValue = {text} setText = {setText} />
          <br/>
          <div className = "buttons"> 
            <button type = "button"onClick = {() => {
              setText("");
              setFile(null);
              fileInputRef.current.value = null;
            }}> Cancel </button>
            <button type = "submit" className= "button">Next</button>  
          </div>
        </form>
      </div>
    </>
  )
}

export default UploadPage;
