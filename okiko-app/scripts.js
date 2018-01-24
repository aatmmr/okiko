const { OperationHelper } = require('apac');
const fs = require('fs');
const natural = require('natural');
const request = require('request');
const htmlparser = require('htmlparser2');

const opHelper = new OperationHelper({
    // credentials here...
    maxRequestsPerSecond: 1,
    locale: 'DE'
});

const monthsToYears = (monthStr) => String(Number(monthStr) / 12);

/* AMAZON API */
function AmazonItemLookup(itemId) {
  return opHelper.execute('ItemLookup', {
    'ItemId': itemId,
    'IdType': 'EAN',
    'ResponseGroup': 'ItemAttributes, Images',
    'SearchIndex': 'All',
  }).then((response) => {
    const item = response.result.ItemLookupResponse.Items.Item;
    const isItemArray = Array.isArray(item);
    const { ItemAttributes, MediumImage } = isItemArray ? item[0] : item;

    // check if age info exist
    const age = ItemAttributes.ManufacturerMinimumAge && ItemAttributes.ManufacturerMinimumAge._
        ? monthsToYears(ItemAttributes.ManufacturerMinimumAge._) : null;
    return { 
        title: ItemAttributes.Title,
        imageUrl: MediumImage.URL || 'NO_IMAGE',
        age
    }
  }).catch((err) => {
    // console.error("Something went wrong! ", itemId, err);
    return {};
  });
}

// try out natural
const BayesClassifier = new natural.BayesClassifier();

/* CLASSIFIER-API */
function Classifier(name) {
  return new Promise((resolve, reject) => {
    // only 1 model is usable. So hardcoding is fine
    natural.BayesClassifier.load('bayes-v4.json', null, function(err, classifier) {
      if (err) reject(err);
      resolve({ age : classifier.classify(name) });
    });
  }).catch(err => {
    return {}
  });
}

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
      ages = ages.splice(1);
      finalAge = Math.min(...ages);
    }
  }
  return finalAge;
}

/* DUO-API */
function duoCrawl(EAN) {
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

// use both amazon and duo
function AnalyseAge(ean, name) {
  const row = [
    new Promise((resolve, reject) => {
      AmazonItemLookup(String(ean)).then(res => resolve(res))
    }),
    new Promise((resolve, reject) => {
      duoCrawl(ean).then(res => resolve(res.age))
    })
  ];
  return Promise.all(row);
}

function CalculateWeightedAge(ages) {
  const ageAmazon = isNaN(String(ages[0])) ? 0 : Number(ages[0]);
  const ageDuo = isNaN(String(ages[1])) ? 0 : Number(ages[1]);
  const ageML = Number(ages[2]);

  const wAmazon = ageAmazon === 0 ? 0 : 5;
  const wDuo = ageDuo === 0 ? 0 : 4;
  const wML = 1;

  return Math.floor(((ageAmazon * wAmazon) + (ageDuo * wDuo) 
    + (ageML * wML)) / (wAmazon + wDuo + wML)); 
}

module.exports = {
  AnalyseAge,
  Classifier,
  CalculateWeightedAge
}
