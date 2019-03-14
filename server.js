const  express = require('express');
const  mongoose = require('mongoose');
const  bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const port = process.env.PORT || 5000;
const enterprises = require('./routes/api/enterprises');
const domains = require('./routes/api/domains');

const app = express();

// activate configuration variable
dotenv.config();

//Bodyparser Middleware
app.use(bodyParser.json());

//Connect to Mongo
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('connected to db...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/enterprises', enterprises);
app.use('/api/domains', domains)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Server started on port ${port}`));
