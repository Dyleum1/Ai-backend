import express from 'express'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'
import bodyParser from 'body-parser'
import env from 'dotenv'

//initialize app
const app = express();

//initialize env
env.config();
//middleware
app.use(bodyParser.json());
app.use(cors());
//initialize open api
const configuration = new Configuration({
  organization: "org-SzbTghArGMG0voNSSSd1Fyot",
  apiKey: process.env.API_KEY, 
})

const openai = new OpenAIApi(configuration);
async function fetchReply() {
  try {
    const response = await openai.createCompletion({
      model: 'davinci:ft-dyleum-2023-06-16-20-01-54',
      prompt: conversationStr,
      presence_penalty: 0,
      frequency_penalty: 0.3,
      max_tokens: 100,
      temperature: 0,
      stop: ['\n', '->'],
    });
    conversationStr += ` ${response.data.choices[0].text} \n`;
    console.log(conversationStr);
  } catch (error) {
    console.error('Error:', error);
  }
}
//route 
//dummy route
// dummy route to test
app.get("/", (req, res) => {
    res.send("I am testing ");
})
let conversationStr = '';
app.post('/reply', async (req, res) => {
  try {
    const userInput = req.body.userInput;
    conversationStr += ` ${userInput} ->`;
    await fetchReply();
    res.sendStatus(200);
  } catch (error) {
    console.error('Error:', error);
    res.sendStatus(500);
  }
});



// async function fetchReply() {
//   const response = await openai.createCompletion({
//     model: 'davinci:ft-dyleum-2023-06-16-20-01-54',
//     prompt: conversationStr,
//     presence_penalty: 0,
//     frequency_penalty: 0.3,
//     max_tokens: 100,
//     temperature: 0,
//     stop: ['\n', '->'],
//   });
//   conversationStr += ` ${response.data.choices[0].text} \n`;
//   console.log(conversationStr);
// }



// router.post('/reply', async (req, res) => {
// const userInput = req.body.userInput;
// conversationStr += ` ${userInput} ->`;
// await fetchReply();
// res.sendStatus(200);
// });


const PORT = 5000;
app.listen(PORT, ()=> console.log('listening on port' + ":" + PORT));