// CREATE - POST
const createBookData = async (data) => {
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
  const getBookData = async (book_name) => {
    const response = await fetch(`http://127.0.0.1:5500/DB/Books.json`, {
      method: 'GET'
    });
    const data = await response.json();
    return data.books.find((book) => book.book_name === book_name);
  };
  
  // READ - GET (all)
  const getAllBookData = async () => {
    const response = await fetch('http://127.0.0.1:5500/DB/Books.json', {
      method: 'GET'
    });
  
    const data = await response.json();
    return data.books;
  };
  
  // UPDATE - PUT
  const updateBookData = async (book_name, data) => {
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
    }
    return null;
  };
  
  // DELETE - DELETE
  const deleteBookData = async (book_name) => {
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

  module.exports({createBookData,getAllBookData,getBookData,updateBookData,deleteBookData})

// Call createBookData to add a new book
createBookData({
    book_name: "To Kill a Mockingbird",
    author_name: "Harper Lee",
    category: "Fiction",
    publication_date: "July 11, 1960",
    publisher: "J. B. Lippincott & Co.",
    isbn: "9780446310789"
  }).then((response) => {
    console.log(response);
  });
  
  // Call getAllBookData to retrieve all books
  getAllBookData().then((books) => {
    console.log(books);
  });
  
  // Call getBookData to retrieve a single book by its name
  getBookData("To Kill a Mockingbird").then((book) => {
    console.log(book);
  });
  
  // Call updateBookData to update a book by its name
  updateBookData("To Kill a Mockingbird", {
    book_name: "To Kill a Mockingbird",
    author_name: "Harper Lee",
    category: "Fiction",
    publication_date: "July 11, 1960",
    publisher: "J. B. Lippincott & Co.",
    isbn: "9780446315555"
  }).then((response) => {
    console.log(response);
  });
  
  // Call deleteBookData to delete a book by its ISBN
  deleteBookData("To Kill a Mockingbird").then((response) => {
    console.log(response);
  });