// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require('express');
const Author = require('../models/author.model');
const router = express.Router(); // this is the router class inside the express library

// ********* require Book model in order to use it *********
const Book = require('../models/Book.model');
const Author = require('../models/author.model'); // this is importing the book model

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

 // if you know the name of the properties, you can comment out all of the const variable creations and add:
 const {title, description, author, rating} = req.body // this is sugar, you can asign default values and rename properties
 // this is called DESTRUCTURING and is another way of doing the below - it is the same

/*  const title = req.body.title
 const description = req.body.description
 const author = req.body.author
 const rating = req.body.rating */


 // next need to create a book:
 Book.create({title, description, author, rating}) // this is saying mongoose, create a book with this object inside it
 // it is referring to req.body.title, req.body.description, req.body.author and req.body.rating - this is sugar
 .then(createdBook => console.log(createdBook))
 .catch (err => console.log(err)) // after creating the book, it is important to redirect the user back to the books i.e.:
 res.redirect('/books')
 // you could also send them back to an edit form, where they can change the value if they made a mistake
})
// by deciding that the user will send a post form, we access the body and from here we can get the field we need

router.get('/add', (req, res) => { // we are referring to the books.hbs file, we use GET because we have used a link and can only use GET with links
  Author.find()
  .then(allAuthors => res.render('books-add', {allAuthors}))
})
// think of the route and the name ('books-add'), then create a file with that name for it to relate to
// after making the author object (in model, we need to give access to all of the authors that exist in the database {allAuthors})
// we need to send this to our form




// to update a book you need to know:
// 1. all of the different ids in the object that you are updating
router.post('/edit/:id', (req, res) => {
  const id = req.params.id
  const {title, description, author, rating} = req.body
  Book.findByIdAndUpdate(id, {title, description, author, rating})
  .then((updatedBook) => res.redirect('/books'))
  .catch(err => console.log(err))
})


// using the URL to read the ID and the body to read that data

router.get('/edit/:id', (req, res)=>{
  const id = req.params.id

  // to read from the mongoose database can use:
  Book.findById(id)
  .then( bookFromfindById => res.render('book-edit', {book: bookFromfindById}))
})

router.get('/delete/:id', (req, res) => {
  const id = req.params.id;
  Book.findByIdAndDelete(id)
  .then(deletedBook => res.redirect('/books'))
})

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Book.findById(id)
  .populate('author') // This is a promise, it goes into the database, reads the id and transforms the random string (id )into a JS object
  //'author' refers the name of the field you want to populate (see book-details.hbs file)
  // by using .populate(), you can treat the author as a real JS object, rather than a random string (id)
  .then( bookFromCollection => res.render("book-details" , bookFromCollection))
});


//{uglyString} - the curly brackets create an object, which has a property named uglyString and it's value is the same as whatever is stored in the variable uglyString i.e. {uglyString: uglyString}
// this is the same as new Object()
//{uglyString} should not be used to manipulate database objects


// uglyString.populate() - populate will go fetch an id and populate with an object (we are accessing the values by using the id)

// uglyString.json() - this is a string format for an object

// uglyString.parseJson() - reads a string and gives an object, doesn't go fetch anything using an id




// ****************************************************************************************
// GET route for displaying the book details page
// ****************************************************************************************

router.get('/', (req, res) => { // What URL does this answer?
  Book.find()
  .then(allBooks => {
    res.render('books', {allBooks})})
   // You have to continue coding the route
});

module.exports = router;
