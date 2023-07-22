const express = require('express')
const axios = require("axios")
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Home Page')
})

app.get('/numbers', async (req, res) => {
    const urls = req.query.url;
    if (!urls) {
        return res.status(400).json({ error: "Please provide 'url' query parameter(s)." });
      }
    
      try {
        const requests = Array.isArray(urls) ? urls : [urls];
        const responses = await Promise.all(requests.map((url) => axios.get(url)));
    
        const numbers = responses.map((response) => response.data);
    
        res.json(numbers);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch data from the provided URLs." });
      }
  res.send('API page')
})

const apiUrl = "http://localhost:3000/numbers";
const urls = ["http://20.244.56.144/numbers/primes"];

axios
  .get(apiUrl, { params: { url: urls } })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });

axios
  .get(apiUrl, { params: { url: urls[0] } })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})