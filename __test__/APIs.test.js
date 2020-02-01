'use strict';

const {server} = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server) ;


describe('Categories API', () => {

  it('get works' , ()=> {
    return mockRequest.get('/api/v1/categories')
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

  it('get with id works' , ()=> {
    let newVal = { name: 'DanTe' , kills : 99 , titles : [ 'Demon-hunter', 'MR-Cool', 'Savior', 'My Hero']};
    return mockRequest.post('/api/v1/categories')
      .send(newVal)
      .then(data => {
        console.log(data.body._id);
        return mockRequest.get(`/api/v1/categories/${data.body._id}`)
          .then(data => {
            expect(data.status).toBe(200);
            expect(data.body[0].name[0]).toEqual('DanTe');
          });
        
      });

  });


  it('post works' , ()=> {
    let newVal = { name: 'DanTe' , kills : 99 , titles : [ 'Demon-hunter', 'MR-Cool', 'Savior', 'My Hero']};
    return mockRequest.post('/api/v1/categories')
      .send(newVal)
      .then(data => {
        expect(data.body.kills).toBe(99);
      });
  });


  it('update works' , ()=> {
    let newVal = { name: 'DanTe' , kills : 99 , titles : [ 'Demon-hunter', 'MR-Cool', 'Savior', 'My Hero']};
    let updated = { name: 'Nero' , kills : 0 , titles : [ 'dead weight']};

    return mockRequest.post('/api/v1/categories')
      .send(newVal)
      .then(data => {

        return mockRequest.put(`/api/v1/categories/${data.body._id}`)
          .send(updated)
          .then(data => {
            expect(data.status).toBe(201);
            expect(data.body.name[0]).toBe('Nero');
          });
      });
  });



  it('delete works' , ()=> {
    let newVal = { name: 'DanTe' , kills : 99 , titles : [ 'Demon-hunter', 'MR-Cool', 'Savior', 'My Hero']};
    return mockRequest.post('/api/v1/categories')
      .send(newVal)
      .then(data => {
        return mockRequest.delete(`/api/v1/categories/${data.body._id}`)
          .then(data => {
            return mockRequest.get(`/api/v1/categories/${data.body._id}`)
              .then(data => {
                expect(data.status).toBe(200);
                expect(data.body[0]).toBe(undefined);

              });
          });
      });


  });


}) ;

///////////////// products Test ////////////

describe('Products API', () => {

  it('get works' , ()=> {
    return mockRequest.get('/api/v1/products')
      .then(data => {
        expect(data.status).toBe(200);
      });
  });
  
  it('get with id works' , ()=> {
    let newVal = { name: 'DanTe' , price : 99 , weight : 85 , quantity_in_stock : 1};
    return mockRequest.post('/api/v1/products')
      .send(newVal)
      .then(data => {
        return mockRequest.get(`/api/v1/products/${data.body._id}`)
          .then(data => {
            expect(data.status).toBe(200);
            expect(data.body[0].name).toEqual('DanTe');
          });
          
      });
  
  });
  
  
  it('post works' , ()=> {
    let newVal = { name: 'DanTe' , price : 99 , weight : 85 , quantity_in_stock : 1};
    return mockRequest.post('/api/v1/products')
      .send(newVal)
      .then(data => {
        Object.keys(newVal).forEach(value => {
          expect(data.body[value]).toEqual(newVal[value]);
        });
      });
  });
  
  
  it('update works' , ()=> {
    let newVal = { name: 'DanTe' , price : 99 , weight : 85 , quantity_in_stock : 1};
    let updated = { name: 'Nero' , price : 0 , weight : 0 , quantity_in_stock : 99};
  
    return mockRequest.post('/api/v1/products')
      .send(newVal)
      .then(data => {
  
        return mockRequest.put(`/api/v1/products/${data.body._id}`)
          .send(updated)
          .then(data => {
            expect(data.status).toBe(201);
            expect(data.body.name).toBe('Nero');
          });
      });
  });
  
  
  
  it('delete works' , ()=> {
    let newVal = { name: 'DanTe' , price : 99 , weight : 85 , quantity_in_stock : 1};
    return mockRequest.post('/api/v1/products')
      .send(newVal)
      .then(data => {
        return mockRequest.delete(`/api/v1/products/${data.body._id}`)
          .then(data => {
            return mockRequest.get(`/api/v1/products/${data.body._id}`)
              .then(data => {
                expect(data.status).toBe(200);
                expect(data.body[0]).toBe(undefined);
  
              });
          });
      });
  
  
  });
  
  
}) ;