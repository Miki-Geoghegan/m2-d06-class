const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const bookSchema = new Schema(
  {
    title: String,
    description: String,
    author: String,
    rating: Number
  },
  {
    timestamps: true // this gives a line of code with the exact time the object was created (in the database) and another with the time the object was modified
  }
);

// const Book = model('Book', bookSchema);
// module.exports = Book;

module.exports = model('Book', bookSchema);
