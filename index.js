const express = require('express');
const routes = require('./routes/api');

//set up express app
const app = express();

//init routes
app.use("/api", routes);

//listen for requestes
app.listen(process.env.port || 4040, function() {
    console.log("now listening for req");
});