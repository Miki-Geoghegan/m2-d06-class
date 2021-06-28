const express = require('express');
const router = express.Router(); // here we create the router class to use

/* GET home page */

// Code the  get('/') route here rendering index
router.get('/', (req, res) => {
    res.render('index', {title: "Home Page TEST"})
}); // app passing this from app.js to the subrouter (index.routes.js) so that it is able to use it
// to handle the '/' from app.js, it needs a function
// title is referring to the index.hbs file

module.exports = router;
