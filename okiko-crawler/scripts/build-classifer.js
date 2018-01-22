const fs = require('fs');
const natural = require('natural');
const nlp = require('compromise');
const readData = require('./readFile');

// try out natural
const BayesClassifier = new natural.BayesClassifier();

readData('./training/modified/total.csv')
  .then(data => {
    const itemNames = data.toString().split('\n');
    
    itemNames.map(item => {
      const values = item.split(';');
      const currNouns = nlp(values[1]).nouns().data();
      const wordArr = currNouns.map(n => n.text.split(' ')).reduce((a, b) => [...a, ...b], []).filter(t => t.length > 0);
      BayesClassifier.addDocument(values[1].split(' '), values[2]);             
    });
    BayesClassifier.train();
  })
  .then(() => {
    BayesClassifier.save('bayes-v4.json', (err, classifier) => {
      if (err) return err;
      console.log('success!');
    })
  })
  .catch(err => console.log(err));