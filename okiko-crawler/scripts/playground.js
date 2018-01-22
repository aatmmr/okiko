const AmazonAPI = require('./amazon');
const DuoCrawl = require('./duo-crawler');

// try amazon
AmazonAPI('4006381398817').then(res => {
  console.log(res);
})

// Try duo crawler
DuoCrawl('4006381398817').then(res => {
  console.log(res);
})