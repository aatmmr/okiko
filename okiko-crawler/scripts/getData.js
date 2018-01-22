// this script is used to scrape the data from duo shop
// URL format: `https://www.duo-shop.de/de-DE/List/0/0/0/-/${pageNumber}`

const request = require('request');
const htmlparser = require('htmlparser2');
const MAIN_URL = 'https://duo-shop.de'
const MILISECOND_MULTIPLIER = 300;

// '/de-DE/Details/Natural-Games-Super-Sechs/240656'
// get the name of item from url above
function getItemName(URL) {
  return URL.split('/')
    .filter(part => part.length > 0)[2].split('-').join(' ');
}

function makeRequest(pageNumber) {
  const parser = new htmlparser.Parser({
    onopentag: (name, attr) => {
      if (name === 'a' && attr.class == 'fn') {
        console.log(pageNumber + ',' + getItemName(attr.href) + ',' + attr.href);
      }
    },
  });

  request(`https://www.duo-shop.de/de-DE/List/0/0/0/-/${pageNumber}`, 
    (err, res, body) => {
    if (err) console.log(err);
    else {
      parser.write(body);
      parser.end();
    }
  });
}

const requests = [];
for (let i = 1; i < 3001; i++) {
  requests.push(new Promise((resolve, reject) => {
    setTimeout(() => resolve(
      makeRequest(i)), i * MILISECOND_MULTIPLIER)        
  }));
}


