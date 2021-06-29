
const express = require('express');
const router = express.Router(); 


const Author = require('../models/author.model');


















router.get('/', (req, res) => {
    Author.find()
    .then(allAuthors => {
      res.render('authors', {allAuthors})})
     // You have to continue coding the route
  });
  
  module.exports = router;
  