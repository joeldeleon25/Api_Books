const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const PORT  = process.env.PORT || 4000;

//mongoDB
mongoose
.connect(
process.env.MONGO_URL,
{useNewUrlParser:true}
)
.then(()=> {
    console.log("connected to mongoDB atlas")
}).catch(error => {
    console.log("Something wrong is happening" , error);
})
//start server
app.listen(PORT, () => {
    console.log(`Server running on `, PORT);
});