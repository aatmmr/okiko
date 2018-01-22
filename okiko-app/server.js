const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 2999;

// app.use('/static', express.static('build/static'));

// app.disable('x-powered-by');

app.use(cors());
app.use(bodyParser.json());

app.get('/iten/:ean', (req, res) => {
  res.json({ ean: req.params.ean });
});

//app.get('*', (req, res) => {
//  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
//});

app.listen(port, () => {
  console.info(`My server listening on port ${port}`);
});
