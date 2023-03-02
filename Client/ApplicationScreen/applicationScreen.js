
// Initialize the book database in localStorage
if (!localStorage.getItem("books")) {
  localStorage.setItem("books", JSON.stringify([]));
}

// Function to add a new book to the database
function addBook(event) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const year = document.getElementById("year").value;
  const book = { title, author, year };
  const books = JSON.parse(localStorage.getItem("books"));
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
  event.target.reset();
  displayBooks();
}

// Function to display all books in the database
function displayBooks() {
  const books = JSON.parse(localStorage.getItem("books"));
  const tbody = document.querySelector("#book-table tbody");
  tbody.innerHTML = "";
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.year}</td>
      <td>
        <button class="edit" data-index="${i}">Edit</button>
        <button class="delete" data-index="${i}">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  }
}

// Function to delete a book from the database
function deleteBook(event) {
  const index = event.target.dataset.index;
  const books = JSON.parse(localStorage.getItem("books"));
  books.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(books));
  displayBooks();
}

// Function to edit a book in the database
function editBook(event) {
  const index = event.target.dataset.index;
  const books = JSON.parse(localStorage.getItem("books"));
  const book = books[index];
  const newTitle = prompt("Enter a new title:", book.title);
  const newAuthor = prompt("Enter a new author:", book.author);
  const newYear = prompt("Enter a new year:", book.year);
  book.title = newTitle;
  book.author = newAuthor;
  book.year = newYear;
  localStorage.setItem("books", JSON.stringify(books));
  displayBooks();
}

// Add event listeners to the add-form, book-table, and document
const addForm = document.getElementById("add-form");
addForm.addEventListener("submit", addBook);
const bookTable = document.getElementById("book-table");
bookTable.addEventListener("click", function(event) {
  if (event.target.classList.contains("edit")) {
    editBook(event);
  } else if (event.target.classList.contains("delete")) {
    deleteBook(event);
  }
});
document.addEventListener("DOMContentLoaded", displayBooks);