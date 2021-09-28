require('dotenv').config()
const express = require('express');
const path = require('path');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const corsOption = require('./config/corsOption')
const errorHandler = require('./middleware/errorHandler')
const Mysql = require('./mysql')
const indexRouter = require('./routes/index')

const app = express();
const port = process.env.PORT | 3000

const db = new Mysql();

//middleware
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//router
app.use('/api', indexRouter);

//catch 404
app.use((req, res, next) => {
  next(createError(404));
});

//errorhandler
app.use(errorHandler);

//start server
app.listen(port, () =>
  console.log(`App listening at port:${port}`)
);