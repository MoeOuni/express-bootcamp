const express = require('express');
const app = express();
const morgan = require('morgan');
const userRouter = require('./routes/userRouters');
const tourRouter = require('./routes/tourRouters');

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public`));

app.use(express.json());

app.use((req, res, next) => {
  console.log('hi from the midleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toDateString();
  next();
});
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

module.exports = app ; 
