'use strict' ;

// 3d party dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');



// custom routes
const coolRouter = require('../routes/dynamic.js')


// applications constants 
const app = express();

// 3d party middleware 
app.use(express.json());

// 3d party dependencies
app.use(cors());
app.use(morgan('dev'));



app.use(coolRouter);

module.exports = {
  server : app ,
  start : (port) => {
    let PORT = port || process.env.PORT || 3000 ;
    // prove of life !
    app.listen(PORT ,()=> {
      console.log(`Lets Rock ${PORT}!!! `);
    });
  },
};
