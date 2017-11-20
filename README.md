# Readable: React Redux App

## About this Project
This is a React web app that mimics the functionality of a content and comment web app such as Reddit. Users can post content to a set of predefined categories. They can then comment on the posts and vote both on either of them. It is also possible to edit and delete posts and comments.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). It makes use of stateless and stateful React components, manages most of the state with Redux, and does routing with React Router. It also makes Rest API calls to a custom server provided in the repository.

## How to Install and Run Project
This repository contains a local backend development server which needs to be used to test the application. It is located in the api-server directory.

To run this project locally, clone or fork this repository and run the following commands:
```sh
# Install packages and start back-end server
$ cd readable-react-app
$ cd api-server 
$ npm install
$ node server.js

# Here you will have to open another bash instance in order to run the front-end server
$ cd readable-react-app
$ npm install
$ npm start
```

## Packages Used in This Project
* React
* Redux
* React Router
* React Bootstrap
* sort-by
* uniqid

## Contributing
This repository is the second project in Udacity's React Nanodegree. If you have any suggestions, want to discuss the approach I took to design the store, routing, components or else, please feel free to contact me to have a chat about it.
