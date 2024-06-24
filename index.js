const dotenv = require("dotenv");
const {GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,} = require("@google/generative-ai");
const fs = require("fs");
const express = require("express");
const cors = require("cors");


const port = process.env.PORT || 5000
const app = express();
app.use(express.json())
app.use(cors());
dotenv.config();
const my_google_ai = new GoogleGenerativeAI(process.env.MY_API_KEY);

app.post("/gemini", async (req, res) => {
    const model = my_google_ai.getGenerativeModel({
        model: "gemini-1.5-flash"
    })
    const chat = model.startChat({
        history: req.body.history
    })
    const msg = req.body.message
    const result = await chat.sendMessage(msg)
    const response = result.response
    const text = response.text()
    res.send(text)
})

app.get("/", async (req, res) => {
    res.send("From the api")
})

app.listen(port, () => {
    console.log(`App server is running at port ${port}`)
})
// const my_google_ai = new GoogleGenerativeAI(process.env.MY_API_KEY);
// const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
// };

// async function run(){
//     const model = my_google_ai.getGenerativeModel({
//         model: "gemini-1.5-flash"
//     })
//     const chat = model.startChat({
//         history: [
//             {
//                 role: "user",
//                 parts:[{ text: "Hello. I have 2 dogs in my house"}]
//             },
//             {
//                 role: "model",
//                 parts: [{text:"Great to meet you. What would you like to know?" }]
//             }
//         ],
//     })

//     const msg = "How many paws are in my house?"
//     const response = await chat.sendMessage(msg)
//     const result = await response.response
//     const text = result.text()
//     console.log(text)
// }

// run()
// function fileToGenerativePart(path, mimeType){
//     return {
//         inlineData: {
//             data: Buffer.from(fs.readFileSync(path)).toString("base64"),
//             mimeType
//         }
//     }
// }

// async function run(){
//     const my_google_model = my_google_ai.getGenerativeModel({model:"gemini-1.5-flash"});
//     const prompt = "What's different between these pictures?"
//     const imageParts = [
//         fileToGenerativePart("React-Js-Hoodies-3_58cee0ee-a155-459e-ae30-85566b3a12bc_large.webp", "image/webp"),
//         fileToGenerativePart("unisex-heavy-blend-hoodie-sport-grey-60041a9760897.webp", "image/webp")
//     ]

//     const response = await my_google_model.generateContent([prompt, ...imageParts]);
//     const result = response.response
//     const text = result.text()
//     console.log(text)
// }

// Text to Text
// async function run(){
//     const google_model = my_google_ai.getGenerativeModel({
//         model: "gemini-1.5-flash"
//     })
//     const prompt = "What is React.js?";
//     const response = await google_model.generateContent(prompt);
//     const result = await response.response
//     const text = result.text();
//     console.log(text);
// }

// // console.log(google_model)

// run()

// run()

//Chat Session in Gemini