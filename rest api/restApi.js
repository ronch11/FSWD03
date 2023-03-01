const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const booksFile = '../DB/Books.json';

// Read the books collection from the JSON file
let books = [];
fs.readFile(booksFile, 'utf8', (err, data) => {
  if (!err) {
    books = JSON.parse(data);
  } else {
    console.error(`Error reading books file: ${err}`);
  }
});

// Save the books collection to the JSON file
function saveBooks() {
  fs.writeFile(booksFile, JSON.stringify(books), err => {
    if (err) {
      console.error(`Error writing books file: ${err}`);
    }
  });
}

// GET all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// GET a book by ID
app.get('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);
  if (!book) {
    res.sendStatus(404);
  } else {
    res.json(book);
  }
});

// POST a new book
app.post('/api/books', (req, res) => {
  const book = req.body;
  if (!book.name || !book.author) {
    res.sendStatus(400);
  } else {
    const newBookId = books.length > 0 ? books[books.length - 1].id + 1 : 1;
    const newBook = { id: newBookId, name: book.name, author: book.author };
    books.push(newBook);
    saveBooks();
    res.status(201).json(newBook);
  }
});

// PUT (update) an existing book
app.put('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);
  if (!book) {
    res.sendStatus(404);
  } else {
    const updatedBook = req.body;
    if (!updatedBook.name || !updatedBook.author) {
      res.sendStatus(400);
    } else {
      book.name = updatedBook.name;
      book.author = updatedBook.author;
      saveBooks();
      res.json(book);
    }
  }
});

// DELETE a book by ID
app.delete('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === bookId);
  if (bookIndex === -1) {
    res.sendStatus(404);
  } else {
    books.splice(bookIndex, 1);
    saveBooks();
    res.sendStatus(204);
  }
});

module.exports = app