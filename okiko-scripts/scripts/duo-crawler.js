const request = require('request');
const htmlparser = require("htmlparser2");
const fs = require('fs');

// given a paragraph of text, return age related information
function getAgeInfo(text) {
  const wordArray = text.toLowerCase().split(' ');
  const ages = [];

  wordArray.map((word, i) => {
    //console.log('w ', word, word.indexOf('jahre'))
    if (word.indexOf('jahre') >= 0) {
      ages.push(wordArray[i - 2] + ' ' + wordArray[i - 1] 
        + ' ' + wordArray[i] + ' ' + (wordArray[i + 1] || ''));
    }
  });
  return ages;
}

function parseAgeInfo(text) {
  let ages = text.split(' ').filter(a => (!isNaN(a) && a.length > 0) || a.match(/\d+/g))
    .map(ag => ag.match(/\d+/g)[0]).filter(b => Number(b) < 18).map(e => Number(e));
  let finalAge = null;

  if (ages.length === 1) {
    finalAge = ages[0];
  } else {
    if (ages.length !== 0) {
      minAge = Math.min(...ages);
      ages = ages.filter(a => a !== minAge);
      finalAge = Math.min(...ages);
    }
  }
  return finalAge;
}

function makeRequest(EAN) {
  return new Promise((resolve, reject) => {
    let age = '';
    const parser = new htmlparser.Parser({
      ontext: (text) => {
        if (text.toLowerCase().indexOf('jahre') >= 0) {
          age += getAgeInfo(text) + ' ';
        }
      },
    });
  
    request('https://www.duo-shop.de/' + EAN, (err, res, body) => {
      if (err) reject(err);
      else {
        parser.write(body);
        parser.end();
        resolve({ age: parseAgeInfo(age) });
      }
    });
  }).catch(err => {
    // if error (which implies no age can be retrieved) returns ''
    return {};
  });
}

module.exports = makeRequest;

/* Example...
readData('./data2.csv')
  .then(data => {
    const itemNames = data.toString().split('\n')
    .splice(1).map( entry => ({ 
      name: entry.split(';')[4], EAN: entry.split(';')[1] 
    }));
    const arrayReqs = itemNames.map((item, i) => {
      return new Promise((resolve, reject) => {
        resolve(makeRequest(item.EAN))
      })
    });

    Promise.all(arrayReqs).then;
});
*/