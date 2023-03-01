<<<<<<< HEAD
/* const express = require('express');
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
=======
// CREATE - POST
const createData = async (data) => {
    const response = await fetch('http://127.0.0.1:5500/DB/Books.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  
    return await response.json();
  };
  
  // READ - GET (by Book Name)
  const readData = async (book_name) => {
    const response = await fetch(`http://127.0.0.1:5500/DB/Books.json`, {
      method: 'GET'
    });
    const data = await response.json();
    return data.books.find((book) => book.book_name === book_name);
  };
  
  // READ - GET (all)
  const getAllData = async () => {
    const response = await fetch('http://127.0.0.1:5500/DB/Books.json', {
      method: 'GET'
    });
  
    const data = await response.json();
    return data.books;
  };
  
  // UPDATE - PUT
  const updateData = async (book_name, data) => {
    const response = await fetch(`http://127.0.0.1:5500/DB/Books.json`, {
      method: 'GET'
    });
    const currentData = await response.json();
    const bookIndex = currentData.books.findIndex((book) => book.book_name === book_name);
    if (bookIndex !== -1) {
      currentData.books[bookIndex] = {...currentData.books[bookIndex], ...data};
      const updateResponse = await fetch('/Books.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentData)
      });
  
      return await updateResponse.json();
>>>>>>> c9618c19c21a382192f662db4d81aa0066afef29
    }
    return null;
  };
  
  // DELETE - DELETE
  const deleteData = async (book_name) => {
    const response = await fetch(`http://127.0.0.1:5500/DB/Books.json`, {
      method: 'GET'
    });
    const currentData = await response.json();
    const newBooks = currentData.books.filter((book) => book.book_name !== book_name);
    if (newBooks.length !== currentData.books.length) {
      currentData.books = newBooks;
      const deleteResponse = await fetch('http://127.0.0.1:5500/DB/Books.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentData)
      });
      return await deleteResponse.json();
    }
    return null;
  };

// Call createData to add a new book
createData({
    book_name: "To Kill a Mockingbird",
    author_name: "Harper Lee",
    category: "Fiction",
    publication_date: "July 11, 1960",
    publisher: "J. B. Lippincott & Co.",
    isbn: "9780446310789"
  }).then((response) => {
    console.log(response);
  });
<<<<<<< HEAD
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
});*/


// CREATE - POST
const createData = async (data) => {
  const response = await fetch('../DB/Books.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return await response.json();
};
    
// READ - GET
const readData = async (id) => {
  const response = await fetch(`https://example.com/api/data/${id}`, {
    method: 'GET'
  });

  return await response.json();
};

// UPDATE - PUT
const updateData = async (id, data) => {
  const response = await fetch(`https://example.com/api/data/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return await response.json();
};

// DELETE - DELETE
const deleteData = async (id) => {
  const response = await fetch(`https://example.com/api/data/${id}`, {
    method: 'DELETE'
  });

  return await response.json();
};

// Create a new data item
createData({  "book_name": "Zootopia 2",
            "author_name": "Catherine Hapka",
            "category": "Children's Literature",
            "publication_date": "2016",
            "publisher": "RH/Disney",
            "isbn": "9780736433910" })
  .then(data => console.log(data))
  .catch(error => console.error(error));
/* 
// Read an existing data item
readData(123)
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Update an existing data item
updateData(123, { name: 'Jane Doe', age: 35 })
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Delete an existing data item
deleteData(123)
  .then(data => console.log(data))
  .catch(error => console.error(error)); */

module.exports = app
=======
  
  // Call getAllData to retrieve all books
  getAllData().then((books) => {
    console.log(books);
  });
  
  // Call readData to retrieve a single book by its ISBN
  readData("To Kill a Mockingbird").then((book) => {
    console.log(book);
  });
  
  // Call updateData to update a book by its ISBN
  updateData("To Kill a Mockingbird", {
    book_name: "To Kill a Mockingbird",
    author_name: "Harper Lee",
    category: "Fiction",
    publication_date: "July 11, 1960",
    publisher: "J. B. Lippincott & Co.",
    isbn: "9780446315555"
  }).then((response) => {
    console.log(response);
  });
  
  // Call deleteData to delete a book by its ISBN
  deleteData("To Kill a Mockingbird").then((response) => {
    console.log(response);
  });
>>>>>>> c9618c19c21a382192f662db4d81aa0066afef29
