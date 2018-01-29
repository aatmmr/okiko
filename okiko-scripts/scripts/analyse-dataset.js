const AmazonAPI = require('./amazon');
const DuoCrawl = require('./duo-crawler');
const Classifier = require('./classifier');
const readFile = require('./readFile');

/*
// try amazon
AmazonAPI('4006381398817').then(res => {
  console.log(res);
});

// Try duo crawler
DuoCrawl('3131910633587').then(res => {
  console.log(res);
});

// try Bayes Classifier
Classifier('Idena Eimergarnitur, 6-teilig, sortiert').then(res => {
  console.log(res);
});
*/

// given an array of length 3, determine the weighted age
// weigted age = w_amazon * age_amazon + w_duo * age_duo + w_ml * age_ml / sum of all weights
function calculateWeightedAge(ages) {
  const ageAmazon = isNaN(String(ages[0])) ? 0 : Number(ages[0]);
  const ageDuo = isNaN(String(ages[1])) ? 0 : Number(ages[1]);
  const ageML = Number(ages[2]);

  const wAmazon = ageAmazon === 0 ? 0 : 5;
  const wDuo = ageDuo === 0 ? 0 : 4;
  const wML = 1;

  return Math.floor(((ageAmazon * wAmazon) + (ageDuo * wDuo) 
    + (ageML * wML)) / (wAmazon + wDuo + wML)); 
}

function analyseAge(ean, name) {
  const row = [
    new Promise((resolve, reject) => {
      AmazonAPI(String(ean)).then(res => resolve(res.age))
    }),
    new Promise((resolve, reject) => {
      DuoCrawl(ean).then(res => resolve(res.age))
    }),
    new Promise((resolve, reject) => {
      Classifier(name).then(res => resolve(res.age))
    })
  ];
  return Promise.all(row);
}

// read the data file
readFile('../okiko-data/250.csv')
  // remove the header here...
  .then(data => data.toString().split('\n'))
  .then(data => {
    const array = [];
    let error = 0;
    let MLError = 0;

    data.map((d, i) => {
      // do analysis here...
      const values = d.split(';');
      const EAN = values[1];
      const name = values[0];
      array.push(analyseAge(EAN, name))
    });

    Promise.all(array).then(result => {
      result.map((ages, i) => {
        const values = data[i].split(';');
        const weightedAge = calculateWeightedAge(ages);
        const realAge = values[2];
        console.log(`${values[0]};${ages.map(age => age || -1).join(';')};${weightedAge};${realAge}`);
        if (Math.abs(Number(realAge) - Number(weightedAge)) > 2) {
          error += 1;
        }
        if (Math.abs(Number(realAge) - Number(ages[2])) > 2) {
          MLError += 1;
        }
      })
    }).then(() => {
      console.log('error rate ', error / data.length);
      console.log('ML error rate ', MLError / data.length);
    });
  });