const fs = require('fs');

module.exports = function readData (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if(err) reject(err);
      else resolve(data);
    });
  });
}
