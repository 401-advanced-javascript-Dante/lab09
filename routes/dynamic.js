'use strict';

const express = require('express');
const router = express.Router();

const categories = require('../models/categories/categories-model.js');
const products = require('../models/products/products-model.js');


function getModel(req , res , next){

  let  model = req.params.model ;
  switch(model){
  case 'categories':
    req.model = categories ;
    next();
    return;
  case 'products':
    req.model = products;
    next();
    return ;
  default:
    next();
    return;        
  }
}

router.param('model' , getModel);

router.get('/api/v1/:model',getHandler);
router.get('/api/v1/:model/:_id',getHandlerById);
router.post('/api/v1/:model',postHandler);
router.put('/api/v1/:model/:_id',updateHandler);
router.delete('/api/v1/:model/:_id',deleteHandler);


function getHandler(req , res , next){

  req.model.get()
    .then(data => {
      res.status(200).json(data);
    }).catch(next);
}
  
  
function getHandlerById(req , res , next){
  let id = req.params._id ;
  req.model.get(id)
    .then(data => {
      res.status(200).json(data);
    }).catch(next);
}
  
  
function postHandler(req , res , next){
  let value = req.body ;
  req.model.create(value)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(next);
}
  
function updateHandler(req , res , next){
  
  let value = req.body ;
  let id = req.params._id ;
  req.model.update(id , value)
    .then(data => {
      res.status(201).json(data);
    });
}
  
  
function deleteHandler(req , res , next){
  let id = req.params._id ;
  req.model.delete(id)
    .then(data => {
      res.status(200).json(data);
    });
}

module.exports= router ;
  
  