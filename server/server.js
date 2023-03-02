const http = require('http');
const fs = require('fs');
const { createBookData, getBookData, getAllBookData, updateBookData, deleteBookData,getAdminData,createAdminData } = require('./rest api/restApi.js');

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  const bookName = url.split('/')[2];
  switch(method){
    case 'GET':
        {
            if (!bookName) {
              const books = await getAllBookData();
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(books));
            } else {
              const book = await getBookData(bookName);
              if (!book) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Book not found' }));
              } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(book));
              }
            }
          }
    case 'POST':
        {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            req.on('end', async () => {
              const newBook = JSON.parse(body);
              const result = await createBookData(newBook);
              res.writeHead(201, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(result));
            });
          }
    case 'PUT':
        {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            req.on('end', async () => {
              const updatedBook = JSON.parse(body);
              const result = await updateBookData(bookName, updatedBook);
              if (!result) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Book not found' }));
              } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
              }
            });
          }
    case 'DELETE':
        {
            const result = await deleteBookData(bookName);
            if (!result) {
              res.writeHead(404, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ message: 'Book not found' }));
            } else {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(result));
            }
          }
    default:
        {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Route not found' }));
          }
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server;