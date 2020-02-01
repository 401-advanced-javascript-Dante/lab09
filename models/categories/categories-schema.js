'use strict' ;

const mongoose = require('mongoose');

require('../products/products-schema.js');

const categories = mongoose.Schema({
  name: {type : Array , require : true },
  kills : {type : Number , require : true},
  titles : {type : Array , require : true },
}, {toObject: {virtuals: true}, toJSON: {virtuals: true}});

categories.virtual('productsNames' , {
  ref: 'products',
  localField: 'name',
  foreignField: 'name',
  justOne: true
})

function link(){
  try{
    this.populate('productsNames');
  } catch(e){
    console.error(e);
  }
} 

categories.pre('find', link);
categories.pre('findOne', link);


module.exports = mongoose.model('categories', categories);