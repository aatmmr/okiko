const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const { AnalyseAge, CalculateWeightedAge, Classifier } = require('./scripts');

const app = express();
const port = process.env.PORT || 2999;

app.disable('x-powered-by');

app.use(cors());
app.use(bodyParser.json());

app.get('/iten/:ean', (req, res) => {
  const ean = String(req.params.ean);
  AnalyseAge(ean).then(ages => {
    const itemName = String(ages[0].title);
    const imageUrl = String(ages[0].imageUrl);
    Classifier(itemName).then(classifierRes => {
      const allAges = [ages[0].age, ages[1], classifierRes.age];
      res.json({
        ean,
        itemName,
        imageUrl,
        amazonAge: ages[0].age,
        duoAge: ages[1],
        mlAge: classifierRes.age,
        weightedAge: CalculateWeightedAge(allAges)
      });
    })
  });
});

app.listen(port, () => {
  console.info(`My server listening on port ${port}`);
});
