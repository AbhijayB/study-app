const express = require('express');
const { GoogleGenAI } = require("@google/genai");
const app = express();
const dotenv = require('dotenv');
const multer = require("multer");
const upload = multer();
const mammoth = require("mammoth");

dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const aiClient = new
GoogleGenAI({
  apiKey: process.env.MY_SECRET_KEY,
});


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post("/api/upload", upload.single("file"), async (req, res) => {
  // Handle file upload and processing here
    const file = req.file;
    console.log(file);
    let parts = [];
    if (req.body.text) {
        parts.push(req.body.text);
    }
    if (file) {
        const bufferedFile = req.file.buffer;
        const ext = file.originalname.split(".").pop().toLowerCase();
        if (ext === "pdf") {
            const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
            const pdfData = new Uint8Array(bufferedFile);
            const pagesText = [];
            const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                pagesText.push(content.items.map(item => item.str).join(" "));
            }
            const text = pagesText.join("\n"); // only one join at the end
            console.log(text);
            parts.push(text);
        } else if (ext === "docx") {
            const data = await mammoth.extractRawText({ buffer: bufferedFile });
            parts.push(data.value);
        } else {
            return res.status(500).json({ error: "Failed to parse input file" });
        }
    }
    let sendThisText = parts.join("\n\n");




    const prompt = `
    You are an AI assistant that generates study materials from a document.

    Using ONLY the text provided by the user, perform all of the following tasks:

    1. Create a clear, concise summary of the document.
    2. Extract the most important key terms and their definitions.
    3. Generate quiz questions that test understanding of the material.
    4. Generate flashcards for studying important concepts.

    You MUST return your response as valid JSON only. No markdown, no comments, no explanations.

    Use the following JSON structure exactly:

    {
    "summary": "",
    "keyTerms": [
        { "term": "", "definition": "" }
    ],
    "quiz": [
        { "question": "", "answer": "" }
    ],
    "flashcards": [
        { "front": "", "back": "" }
    ]
    }
    `;
    const responseSchema = {
    // The top-level response must be a single JSON object.
    type: "object",
    description: "A complete set of study materials generated from the input document.",
    
    // Define the four required top-level fields
    properties: {
        summary: {
            type: "string",
            description: "A clear, concise, and comprehensive summary of the entire document."
        },
        keyTerms: {
            type: "array",
            description: "A list of the most important key terms and their definitions extracted from the document.",
            items: {
                type: "object",
                properties: {
                    term: { 
                        type: "string", 
                        description: "A single, important key term or concept." 
                    },
                    definition: { 
                        type: "string", 
                        description: "A brief, clear definition or explanation of the term." 
                    }
                },
                required: ["term", "definition"]
            }
        },
        quiz: {
            type: "array",
            description: "A list of quiz questions and their correct answers that test understanding of the material.",
            items: {
                type: "object",
                properties: {
                    question: { 
                        type: "string", 
                        description: "A quiz question based on the document's content." 
                    },
                    answer: { 
                        type: "string", 
                        description: "The correct, concise answer to the quiz question." 
                    }
                },
                required: ["question", "answer"]
            }
        },
        flashcards: {
            type: "array",
            description: "A list of flashcards for studying important concepts from the document.",
            items: {
                type: "object",
                properties: {
                    front: { 
                        type: "string", 
                        description: "The 'front' of the flashcard, typically a question or term." 
                    },
                    back: { 
                        type: "string", 
                        description: "The 'back' of the flashcard, typically the answer or definition." 
                    }
                },
                required: ["front", "back"]
            }
        }
    },
    // Ensure all four major sections are always present in the response
    required: ["summary", "keyTerms", "quiz", "flashcards"]
    };


    const content = await aiClient.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
            {
                parts: [
                    {text: prompt},
                    {text: sendThisText}   
                ]
            }
        ],
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema
        }
    });
    try {
    const rawText = content.text.trim(); 
    console.log("Raw Text (Manual Parsing):", rawText);
    
    // 2. Perform manual parsing
    const output = JSON.parse(rawText); 

    // 3. Log the parsed object
    console.log("Parsed JSON Object (Success):", output);
    res.json(output);
    } catch (err) {
    console.error("Failed to parse Gemini response:", err);
    res.status(500).json({ error: "Failed to parse AI response" });
    }
});


app.listen(5000);