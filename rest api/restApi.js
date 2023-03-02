// CREATE - POST
const createBookData = async (data) => {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    books.push(data);
    localStorage.setItem("books", JSON.stringify(books));
    return data;
  };
  
  const createAdminData = async (data) => {
    const administrators = JSON.parse(localStorage.getItem("administrators")) || [];
    administrators.push(data);
    localStorage.setItem("administrators", JSON.stringify(administrators));
    return data;
  };
  
  // READ - GET (by Book Name)
  const getBookData = async (book_name) => {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    return books.find((book) => book.book_name === book_name);
  };
  
  const getAdminData = async (email) => {
    const administrators = JSON.parse(localStorage.getItem("administrators")) || [];
    return administrators.find((admin) => admin.email === email);
  };
  
  // READ - GET (all)
  const getAllBookData = async () => {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    return books;
  };
  
  // UPDATE - PUT
  const updateBookData = async (book_name, data) => {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const bookIndex = books.findIndex((book) => book.book_name === book_name);
    if (bookIndex !== -1) {
      books[bookIndex] = { ...books[bookIndex], ...data };
      localStorage.setItem("books", JSON.stringify(books));
      return books[bookIndex];
    }
    return null;
  };
  
  // DELETE - DELETE
  const deleteBookData = async (book_name) => {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const newBooks = books.filter((book) => book.book_name !== book_name);
    if (newBooks.length !== books.length) {
      localStorage.setItem("books", JSON.stringify(newBooks));
      return newBooks;
    }
    return null;
  };

//   // Creating a new book in the database
// const bookData = {
//     book_name: "The Great Gatsby",
//     author_name: "F. Scott Fitzgerald",
//     publication_year: 1925,
//     genre: "Novel",
//     ISBN: "978-0-684-80146-3",
//     language: "English",
//     publisher: "Charles Scribner's Sons"
//   };
//   createBookData(bookData).then(data => {
//     console.log("New book added:", data);
//   }).catch(error => {
//     console.error("Error adding book:", error.message);
//   });
  
//   // Retrieving a book by name
//   getBookData("To Kill a Mockingbird").then(data => {
//     console.log("Book found:", data);
//   }).catch(error => {
//     console.error("Error finding book:", error.message);
//   });
  
//   // Retrieving all books
//   getAllBookData().then(data => {
//     console.log("All books:", data);
//   }).catch(error => {
//     console.error("Error retrieving books:", error.message);
//   });
  
//   // Updating a book by name
//   const bookUpdateData = {
//     publication_year: 1960,
//     publisher: "J. B. Lippincott & Co."
//   };
//   updateBookData("To Kill a Mockingbird", bookUpdateData).then(data => {
//     console.log("Book updated:", data);
//   }).catch(error => {
//     console.error("Error updating book:", error.message);
//   });
  
//   // Deleting a book by name
//   deleteBookData("The Catcher in the Rye").then(data => {
//     console.log("Book deleted:", data);
//   }).catch(error => {
//     console.error("Error deleting book:", error.message);
//   });