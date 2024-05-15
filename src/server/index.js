var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const FormData = require('form-data');
const dotenv = require('dotenv');
dotenv.config();

// const fetch = require('node-fetch');

let fetch;
import('node-fetch').then(({ default: nodeFetch }) => {
    fetch = nodeFetch;
});

const app = express();

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('dist'));

//API
const apiURL = "https://api.meaningcloud.com/sentiment-2.1";
const apiKey = process.env.API_KEY;

console.log(__dirname);

//variable for url and api key

app.get('/', function (req, res) {
    res.send("This is the server API page, you may access its services via the client app.")
});


// POST Route
app.post('/api', async function(req, res) {
    const input = req.body.url
    console.log(`User input: ${input}`)

    const formdata = new FormData();
    formdata.append("key", apiKey);
    formdata.append("url", req.body.url);
    formdata.append("lang", "en");

    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };
    
    try {
      const response = await fetch(apiURL, requestOptions);
      const output = await response.json();
      console.log(output);
      res.send(output);
    } catch (error) {
        console.log('error', error);
        res.status(500).send('Failed to fetch data');
    }

});

// designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});