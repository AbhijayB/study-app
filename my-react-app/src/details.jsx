import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {useNavigate} from "react-router-dom";

// White - F7FFF7
// Yellow - FFE66D
// Dark Grey - 495867
// Light Red - FF6B6B
// Teal - 4ECDC4



function Options({details, setDetails}) {
    const options = ["Summarize my Notes", "Make a Quiz", "Create Flashcards"];
    const [toggled, setToggled] = useState(Array(options.length).fill("option-button"));
    const newDetails = [...details];
    return (
        <>
        {options.map((option, index) => (
            <button type = "button"className = {toggled[index]} key={index} onClick = {() => {
                const newToggled = [...toggled];
                if (newToggled[index] === "option-button") {
                    newToggled[index] = "option-button-toggled";
                    newDetails[index] = option;
                    
                } else {
                    newToggled[index] = "option-button";
                    newDetails[index] = null;
                }
                setDetails(newDetails);
                console.log(newDetails);
                setToggled(newToggled);
            }}
            >{option}</button>
        ))}
        </>
    );
}


function DetailsPage({details, setDetails, text, setText, file, setFile}) {
    const navigate = useNavigate();
    const [useLoading, setUseLoading] = useState(false);
    const cancelPage = (e) => {
        setText("");
        setFile(null);
        setUseLoading(false);
        console.log(text);
        navigate("/");
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        setUseLoading(true);
        try {
            const formData = new FormData();
            formData.append("text", text);
            formData.append("file", file);
            formData.append("details", JSON.stringify(details));

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData
            });
            const result = await res.json();
            console.log(result);
        } catch (err) {
            console.log(err);
            alert("An error occurred during upload. Please try again.");
        } finally {
            setUseLoading(false);
        }


        // Add upload logic here
    };

  return (
    <>
        <form onSubmit={handleUpload}>  
            <div className = "container">
                <div className = "header"><strong>What do you want to do?</strong></div>
                <br/>
                <Options details = {details} setDetails = {setDetails} />
                <br/>
                <div className = "buttons"> 
                    <button type = "button" onClick = {cancelPage} disabled = {useLoading}> Cancel </button>
                    <button type = "submit" className= "button" disabled = {useLoading}>{useLoading ? "Uploading..." : "Upload"}</button>  
                </div>
            </div>
        </form>
    </>
  );
}

export default DetailsPage;
