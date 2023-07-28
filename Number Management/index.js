const express = require('express');
const application = express();
const axios = require('axios');
const port = 3000;


application.use(express.json());


application.get('/numbers', async (req, res) => {
  try {
    const urlList = req.query.url;
    if (!urlList || !Array.isArray(urlList)) {
      return res.json({ error: 'Invalid URL' });
    }

    const responseList = await Promise.all(urlList.map(url => axios.get(url)));

    const numberList = responseList.map(response => response.data?.numbers || []);
    const uniqueNumberList = [...new Set(numberList)].sort((m, n) => m - n);

    return res.json({ numbers: uniqueNumberList });
  } catch (err) {
    return res.json({ err: 'Internal  Error' });
  }
});


application.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});