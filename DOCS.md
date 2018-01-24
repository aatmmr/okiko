# Documentation

## Problem statement
Given a list of products, find their minimum-age classifications within 
a reasonable amount of time (30s per item) with high percentage of accuracy.

## Solution
Our solution combines web-crawling, database search and ML model to 
approximate the appropriate minimum age of a product.

## Software
There are two main software in this project, the web app and the scripts.
The web app displays the data from age classification analysis. The scripts
contain various routines such as collecting data from various websites and 
training the ML model to classify product names. This product is done entirely
using Javascript and NodeJS.

## Web app - (Okiko-app)
This app is built using nodejs backend and react frontend. Latest version of
node.js is required and modern browser to view the app. To start the server, run
node server.js and to start the react app, run npm start. Both of which needs to be
executed from the /okiko-app directory.

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

In addition, the directory also contains several ML models and cleaned data for training
and test set. The training dataset is used to train the ML model to recognise product age category and the test dataset is used to validate the ML model.

## Naive Bayes Classifier
We use naive bayes classifier to build our ML model. This classifier is based on Bayes's rule.
Specifically, given a set of classes (C_1...C_K) and input X, we want to find the highest value
of p(C_N | X), where N is {1...K}. In other words, given an input, what is the probability that it belongs to this class?

This algorithm is widely used to classify text because it is easy to implement and produced promising results. It does not require a lot of data to produce a model that can classify new data with a fair accuracy.

In our case, we gather features from the words in our products and assign a class (ages from 2-18) to them accordingly, such that it forms a distribution. From there, we can predict which class does the new input belong to.

