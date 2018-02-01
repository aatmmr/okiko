const AmazonAPI = require('./amazon');
const DuoCrawl = require('./duo-crawler');
const Classifier = require('./classifier');
const readData = require('./read-file');

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
  let ageDuo = isNaN(String(ages[1]));
  if (isNaN(String(ages[1])) || Number(ages[1]) === Infinity 
    || Number(ages[1]) === 0) {
    ageDuo = 0;
  } else {
    ageDuo = Number(ages[1]);
  }
  const ageML = Number(ages[2]);

  const wAmazon = ageAmazon === 0 ? 0 : 5;
  const wDuo = ageDuo === 0 ? 0 : 4;
  const wML = 1;

  const result = Math.floor(((ageAmazon * wAmazon) + (ageDuo * wDuo) 
  + (ageML * wML)) / (wAmazon + wDuo + wML));  
  return result;
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
readData('../okiko-data/TEST-DATA-OKIKO.csv')
  // remove the header here...
  .then(data => data.toString().split('\n'))
  .then(data => {
    const array = [];
    let error = 0;
    let MLError = 0;

    data.map((d, i) => {
      // do analysis here...
      const values = d.split(';');
      const EAN = values[1].replace('\r', '');
      const name = values[0];
      array.push(analyseAge(EAN, name))
    });
  
    Promise.all(array).then(result => {
      result.map((ages, i) => {
        const values = data[i].split(';');
        const name = values[0];
        const EAN = values[1].replace('\r', '');
        const weightedAge = calculateWeightedAge(ages);
        console.log(`${EAN};${name};${weightedAge}`);
      })
    });
  });