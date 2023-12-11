// const createError = require("http-errors");
const express = require('express');
const path = require('path');
const cookieParser= require("cookie-parser");
const logger =require('morgan');


const indexRouter = require("./routes/index");

const app =express();


app.use("/", indexRouter);


app.listen(4000, function(){
    console.log("express is online");
});

module.exports = app;