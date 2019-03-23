<p align="center">
  <h1 align="center">SLFE Knowledgebase</h1>
  <p align="center">
    The Sustainable Local Food Enterprise system. This project is in collaboration with the ASU School of Sustainability and Leuphana University in Lueneburg, Germany.
    <br>
    <br>
    <a href="#documentation"><strong>Explore Documentation »</strong></a>
    <br>
    
  </p>
</p>

<br>

## Table of contents

- [Running the Project](#running-the-project)
- [Documentation](#documentation)
- [License](#license)

## Running the Project

**Prerequisites**

These services must be installed:
- [Git](https://git-scm.com/downloads)
- [Heroku](https://devcenter.heroku.com/articles/heroku-cli)
- [Node.js](https://nodejs.org/en/download/)
- [NPM](https://www.npmjs.com/get-npm)
- [MongoDB](http://www.mongodb.org/)

**Installation**

Clone or fork this repository to your local machine:
```
$ git clone https://github.com/panza8484/capstone-slfe-knowledgebase.git
```
Install the depencies with the following commands:
```
$ npm install
$ npm run client-install
```

**Development Mode**

For testing on `localhost`, create a file named `.env` in the root directory and set the database credentials as below:
```
MONGODB_URI=[mongodbURI]
```
1. `$ npm run dev` || `MONGODB_URI=[mongodbURI] npm run server`
2. Browsersync can be accessed through `localhost:3000`

**Production Mode**
1. `git add .`
2. `git commit -am "new commit"`
3. `git push heroku master`

## Documentation

The documentation included within this repository will guide you through the api usages and visual components available and their usage methods.

## License

The contents of this repository are covered under the [MIT License](https://github.com/panza8484/capstone-slfe-knowledgebase/blob/master/LICENSE).
