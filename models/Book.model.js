const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const bookSchema = new Schema(
  {
    title: String,
    description: String,
    author: {type: Schema.Types.ObjectId, ref: "Author"}, // this is saying to mongoose that we want the author to be a special type of string
    // we will only  see a random id string in the database, we use Schema.Types.ObjectId to tell mongo that this string is a reference to an "Author"
    // taken embedded information and want to make it part of the database
    // Schema.Types.ObjectId links to the author model created, it links to an author through their Id
    // type and reference are required in this format, you can also add other things
    rating: Number
  },
  {
    timestamps: true // this gives a line of code with the exact time the object was created (in the database) and another with the time the object was modified
  }
);

// const Book = model('Book', bookSchema);
// module.exports = Book;

module.exports = model('Book', bookSchema);
