# Poppins: Your Very Own Web Nanny

## Problem statement
Given a list of products, create a technical solution find their minimum-age classifications within a reasonable amount of time (30s per item) with high percentage of accuracy. The result will decide whether a product is suitable for a child of a certain age.

## Story
We are in collaboration with the company Okiko, which provides a payment platform for children to shop online with minimum supervision from their parents. The company wants to find an efficient way to find an item without age classification to ensure that children are shopping in a safe environment.

## Solution
Our solution is a program that combines web crawling, database search and ML model to approximate the appropriate minimum age of a product. The algorithm first performs database search on the biggest online retailer and subsequently also collects age related information from other big online retailers through web crawling. In addition, we also analyse the product using our ML model. 

![Imgur](https://i.imgur.com/fenjGFF.png)

We gather all the results and give a final age classification that can be tuned using confidence values, which represent how reliable the age information are. The final age is given by:

![Imgur](https://i.imgur.com/ORnvIfT.png)

## Project Structure
The project is divided into main parts: the web app and the scripts. The web app displays the data from age classification analysis. The scripts contain various routines such as collecting data from various websites and training the ML model to classify product names. This product is done entirely using Javascript and NodeJS. To run the project, NodeJS has to be installed first. The installer  (which also contains the instructions) can be found here: https://nodejs.org/en/download/. This will also include npm, which is a program to retrieve useful javascript packages (libraries) online. Since we are depending on amazon item search API, please register as amazon partner here: https://partnernet.amazon.de/. Then fill in the missing information in /okiko-app/scripts.js and /okiko-scripts/scripts/amazon.js with the credentials you have obtained upon successful registration with amazon.

![Imgur](https://i.imgur.com/xh53CP2.png)

## Web app - (Okiko-app)
This app is built using NodeJS backend and react frontend. Latest version of node.js is required and modern browser to view the app. To run the app, we have to do the following things:
1.	Go to directory /okiko-app.
2.	Run ‘npm install’ in the terminal to install all of the required dependencies.
3.	Run `npm server.js` to run the server.
4.	On a separate terminal window, run ‘npm run start’ to start the front end. 
5.	A web browser will automatically be opened, and to see it in action, try accessing ‘http://localhost:3000/item/{EAN}’ where {EAN} is a 13 digit product identification number (e.g 3417761097441). Then, you should see something like the following picture:


## Scripts
The scripts are located in /okiko-scripts directory. Below are the functions of some
of the scripts:

  1. amazon.js - get age related info from amazon item API.
  2. analyseDataset.js - Calculate the final (weighted) product ages from list of products.
  3. classifier.js - get age classification from product name using naive bayes classifier, using the data gathered from scrapeData.js as the training data.
  4. duo-crawler.js - gather age related info from duo-shop.de, given a product EAN.
  5. readFile.js - to read .csv file
  6. scrapeData.js - gather data by crawling duo-shop.de

We also used several libraries to help us to abstract various implementations. Some notable
libraries include:

  1. express.js - for server
  2. natural - NLP library that contains bayes classifier
  3. request - a library to make network calls, we use this mainly to crawl websites
  4. htmlparser2 - a html parser to process html input

### Libraries
We used several libraries to help us to abstract various implementations. Some notable libraries include:
1.	express.js - A lightweight web framework. We use this to write the server.
2.	natural - NLP library that contains the implementation of Naïve Bayes classification.
3.	request - a library to make network calls, we use this mainly to crawl websites.
4.	htmlparser2 - a html parser to process html input. This library is very useful in searching a particular or group of HTML elements.

### Naive Bayes Classifier
We use Naive Bayes classifier to build our ML model. This classifier is based on Bayes' rule. Specifically, given a set of classes (C_1...C_K) and input X, we want to find the highest value of p(C_N | X), where N is {1...K}. In other words, given an input, what is the probability that it belongs to this class?
This algorithm is widely used to classify text because it is easy to implement and produced promising results. It does not require a lot of data to produce a model that can classify new data with a fair accuracy.
An example of Naïve Bayes classification is as follows: Suppose I have Bayes classifier that is based on four texts with two labels:
'I am long qqqq' -> 'buy'
'buy the q\'s' -> 'buy'
'short gold' -> 'sell'
'sell gold' -> 'sell'
Suppose I have an unlabeled text 'I am short silver', the classifier should label this text as a ‘sell’. This is because the most similar content in the model is labeled as ‘sell’. In this project, we use the ages 2 to 17 to label the product names.

### Building and Running ML Model
To train an ML model, we need to get training data. The data that we need are the name of the product and its corresponding minimum age classification. Example scripts to gather the required data are provided in get-data.js, scrape-data.js, duo-crawler.js. Typically, we create a training dataset to ‘teach’ the model and the test data to test the accuracy of the model. An example of training and test dataset is also available in ‘/training’ directory.
Using the training data, we use build-classifier.js to create the Bayes classifier model. First, we need to ensure that we are pointing to the correct path to the data as shown in the picture below:

![Imgur](https://i.imgur.com/XluI1eL.png)

Then we need to specify the name of the model, in the case below it is named ‘bayes-v4’.

![Imgur](https://i.imgur.com/2cMEpOr.png)

Finally, we may use classifier.js to predict a product’s age classification given its name. Please be sure that the path to the model is correct. In the case below, the model (bayes-v4) is stored in directory ‘./models’.

![Imgur](https://i.imgur.com/d5DXyd2.png)

### Algorithm Implementation
The full algorithm may be viewed in analyse-dataset.js. The function analyseAge retrieves age related information from Amazon, duo-shop.de and the ML model asynchronously, given a products’ name and its corresponding EAN number and returns an array which contains the resulting ages.

![Imgur](https://i.imgur.com/kPkQA3V.png)

Then, we calculate the weighted age, using the function calculateWeightedAge. Using the two functions, we can approximate many products in a list.

## Credits
Poppins is created by team OkikoOne as part of the Unternehmer TUM Tech Challenge. Our members are:
1.	Rafael Braga
2.	Muhammad Rafdi
3.	Niels Sharman
4.	Valentin Wellman

## License
This project is licensed using GPL3+. For more information, please visit: https://opensource.org/licenses/GPL-3.0.

