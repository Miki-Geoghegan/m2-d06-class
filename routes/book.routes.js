// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require('express');
const router = express.Router(); // this is the router class inside the express library

// ********* require Book model in order to use it *********
const Book = require('../models/Book.model'); // this is importing the book model

// ****************************************************************************************
// GET route to display all the books - goal to display all books in the database
// ****************************************************************************************

router.get('/', (req, res) => { // with app.js we would use app.get ('/books', etc..), as we already have that in app.js, here we just refer to the MAIN router
// we refer to the main router with '/'
// if you write '/books' we will be searching the URL for '/books/books'
  Book.find() // if you call .find() without any parameters, you will get all of the data
  .then(allBooks => res.render('books', {allBooks}))
   // You have to continue coding the route
});

// this next method answers to the /books/add URL - we want this to happen when someone is in /books/add 
// we just write /add because we are already in books (from app.js, as above)
router.post('/add', (req, res) => {
 const title = req.body.title
 const description = req.body.description
 const author = req.body.author
 const rating = req.body.rating
// next need to create a book:
 Book.create({title, description, author, rating})
 .then(createdBook => console.log(createdBook))
})
// by deciding that the user will send a post form, we access the body and from here we can get the field we need

// ****************************************************************************************
// GET route for displaying the book details page
// ****************************************************************************************

router.get('/books/:id', (req, res) => {
  const id = req.params.id;
  Book.findById(id)
   // You have to continue coding the route
});

module.exports = router;
