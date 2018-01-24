// Get EAN, Name, url, image url, age

const request = require('request');
const htmlparser = require('htmlparser2');
const readData = require('./readFile');

const MAIN_URL = 'https://duo-shop.de/';
const MILISECOND_MULTIPLIER = 500;
const DATA_PATH = './results/final_data/3-only.csv';

// '/de-DE/Details/Natural-Games-Super-Sechs/240656'
// get the name of item from url above
function getItemName(URL) {
  return URL.split('/')
    .filter(part => part.length > 0)[2].split('-').join(' ');
}

function getAgeInfo(text) {
  const wordArray = text.toLowerCase().split(' ');
  let ageInfo = '';

  wordArray.map((word, i) => {
    //console.log('w ', word, word.indexOf('jahre'))
    if (word.indexOf('jahre') >= 0) {
      ageInfo += wordArray[i - 3] + ' ' + wordArray[i - 2] + ' ' + wordArray[i - 1] 
        + ' ' + wordArray[i] + ' ' + wordArray[i + 1] || ' ';
    }
  });
  return ageInfo;
}

function makeRequest(ean, name) {
  let ageInfo = '';
  const parser = new htmlparser.Parser({
    ontext: (text) => {
      if ((text.indexOf('Jahre') > 0 || text.indexOf('Jahren') > 0)) {
        ageInfo += getAgeInfo(text) + ' ';
      }
    },
    onend: () => {
      // print EAN, Name, url, image url, age
      console.log(`${ean};${name};${ageInfo || 'NO_AGE'}`);
    }
  });

  request(MAIN_URL + ean, (err, res, body) => {
    if (err) console.log(ean, err);
    else {
      parser.write(body);
      parser.end();
    }
  });
}

readData(DATA_PATH)
  .then(rows => {
    const rowsArr = rows.toString().split('\n');
    const arrReqs = [];
    rowsArr.map((row, i) => {
      const values = row.split(',');
      const ean = values[0];
      const name = values[1];
      if (i >= 1500) {
        arrReqs.push(new Promise((resolve, reject) => {
          resolve(makeRequest(ean, name))
        }).catch(err => { console.log(err) }));
      }
    })
    Promise.all(arrReqs);
  });