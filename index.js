const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/api');
const mongoose = require('mongoose');

//set up express app
const app = express();

//connect to mongoDB
mongoose.connect('mongodb://localhost/userData');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//init routes
app.use("/api", routes);

//error handle
app.use(function(err, req, res, next){
    res.status(422).send({error: err.message});
});
//listen for requestes
app.listen(process.env.port || 4040, function() {
    console.log("now listening for req");
});