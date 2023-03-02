class FXMLHttpRequest {
        
    /**
    * Constants
    */
     UNSENT = 0;
     OPENED = 1;
     HEADERS_RECEIVED = 2;
     LOADING = 3;
     DONE = 4;
 

    constructor() {
      this.readyState = 0;
      this.status = 0;
      this.statusText = "";
      this.responseText = "";
      this.headers = {};
      this.onreadystatechange = function() {};
    }

    /**
     * Sets a header for the request.
     *
     * @param string header Header name
     * @param string value Header value
     */
    setRequestHeader = function(header, value) {
        headers[header] = value;
        this.status = 2
    };

    /**
     * Gets a header from the server response.
     *
     * @param string header Name of header to get.
     * @return string Text of the header or null if it doesn't exist.
     */
    getResponseHeader = function(header) {
    if (this.readyState > this.OPENED && response.headers[header]) {
        return header + ": " + response.headers[header];
    }
    
    return null;
};

    /**
     * Open the connection. Currently supports local server requests.
     *
     * @param string method Connection method (eg GET, POST)
     * @param string url URL for the connection.
     * @param boolean async Asynchronous connection. Default is true.
     */
    open(method, url, async=true) {
      if (this.readyState !== 0) {
        throw new Error("Invalid state");
      }
      this.readyState = 1;
      this.method = method;
      this.url = url;
      this.async = async;
    }
  
    /**
     * Sends the request to the server.
     *
     * @param string data Optional data to send as request body.
     */
    send(data=null) {
      if (this.readyState !== 1) {
        throw new Error("Invalid state");
      }
      
      const db = window.localStorage; // get the local storage object
      const key = "myDatabase"; // name of the database
      
      // get the existing data from the database, or an empty array if it doesn't exist
      const existingData = JSON.parse(db.getItem(key) || "[]");
      
      // add the new data to the array
      existingData.push(data);
      
      // store the updated data back in the database
      db.setItem(key, JSON.stringify(existingData));
      
      // simulate a delay of 1 second to mimic the time it takes to send the data to the database
      setTimeout(() => {
        this.readyState = 4;
        this.status = 200;
        this.statusText = "OK";
        this.responseText = "Data sent to local storage database";
        this.onreadystatechange && this.onreadystatechange();
      }, 1000);
    }
    
    // TODO: implement other methods and properties of the XMLHttpRequest class
  }

function showBooks() {
  var temp = document.getElementsByTagName("template")[0];
  temp.innerHTML = booksTemplate;
  document.body.appendChild(temp.content.cloneNode(true));
  var books = document.getElementsByTagName("book");
  for (var i = 0; i < books.length; i++) {
    books[i].addEventListener("click", function() {
      var bookName = this.getAttribute("name");
      var book = getBook(bookName);
      if (book) {
        var bookTemplate = document.getElementById("book-template").innerHTML;
        var template = Handlebars.compile(bookTemplate);
        var html = template(book);
        document.body.innerHTML = html;
      }
    });
  }

}

 
  exports.FXMLHttpRequest