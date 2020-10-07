// Book Class
class Book {
    constructor(title, author, pages, isbn, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.isbn = isbn
        this.read = read
    }
}

// UI Class
class UI {
    static displayBooks() {
        const books = [];

        books.forEach((book) => UI.addBookToLibrary(book));
    }

    static addBookToLibrary(book) {
        const library = document.querySelector('#library'); 

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${book.isbn}</td>
            <td>${book.read}</td>
            <td><button class="remove-btn">Remove</button></td>
        `;

        library.appendChild(row);
    }

    // Show message with error or success
    static alertMessage(message, className) {
        const container = document.querySelector('.container')
        const form = document.querySelector('#book-form');
        const div = document.createElement('div');
        div.textContent = message;
        div.classList.add(className);

        if (className === 'error') {
            container.insertBefore(div, form);
            setTimeout(() => {
                div.remove();
            }, 3000);
        } else {
            container.insertBefore(div, form);
            setTimeout(() => {
                div.remove();
            }, 3000);
        }
        
    }

    // Remove book
    static removeBook(target) {
        if (target.classList.contains('remove-btn')) {
        target.parentElement.parentElement.remove();
        } else {
            return;
        }
    }
}

// Store Library Class



// Event: display books
document.addEventListener('DOMContentLoaded', UI.displayBooks());

// Event: add a book
const form = document.querySelector('#book-form');
form.addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values    
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const isbn = document.querySelector('#isbn').value;
    const read = document.querySelector('#read').value;

    if (title === '' || 
        author === '' || 
        pages === '' ||
        isbn === '') {
        
        // Initiate error message
        const message = 'Please fill in all fields';
        const className = 'error';
        UI.alertMessage(message, className);

    } else {

        // Initiate success message
        const message = 'Book added succesfully';
        const className = 'success';
        UI.alertMessage(message, className);

        // Create new book with input values
        let book = new Book(title, author, pages, isbn, read);

        // Add book to library
        UI.addBookToLibrary(book);
        UI.displayBooks();

        // Clear form fields
        form.reset();
        }

});

// Event: remove a book
const library = document.querySelector('#library');
library.addEventListener('click', (e) => {
    UI.removeBook(e.target);
});


























/*

let myLibrary = [];
const library = document.getElementById('library');
const button = document.getElementById('add-book');
let newBook;

// BOOK CONSTRUCTOR
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

// PROTOTYPE
Book.prototype.bookInfo = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read} yet`;
}

// ADD NEW BOOK
const form = document.querySelector('form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.getElementById('read');
const notRead = document.getElementById('not-read');

form.addEventListener('submit', (e) => {
    let newBook = Book(title, author, pages, read);

})

button.addEventListener('click', function() {
    document.getElementById('library').innerHTML = 
    '<form>' + 
        '<div><label for="title">Title: </label>' + 
        '<input type="text" id="title" name="title"></div>' +
        '<div><label for="author">Author: </label>' + 
        '<input type="text" id="author" name="author"></div>' +            '<div><label for="pages">Pages: </label>' + 
        '<input type="text" id="pages" name="pages"></div>' + 
        '<div><input type="radio" id="read" name="read">' +
        '<label for="read">Read yet</label></div>' +
        '<div><input type="radio" id="not-read" name="not-read">' +
        '<label for="not-read">Not read yet</label></div>' + 
        '<button type="submit">ADD TO LIBRARY</button>'
    '</form>'
})

// BOOKS
let book1 = new Book("The Shining", "Stephen King", 300, "not read");
let book2 = new Book("IT", "Stephen King", 200, "read");
let book3 = new Book("The Hobbit", "J.K. Rowling", 350, "read");
let book4 = new Book("De Aanslag", "Harry Mulisch", 400, "read");
let book5 = new Book("De Avonden", "Gerard Reve", 150, "not read");

// ADD BOOK TO LIBRARY
function addBookToLibrary(book) {
    myLibrary.push(book);
  }


addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
addBookToLibrary(book5);


// DISPLAY LIBRARY ON PAGE
let printThis = '';
let x;

function displayLibrary() {
    for (x in myLibrary) {
        printThis += `<p>${Object.keys(myLibrary[x])}<br>${Object.values(myLibrary[x])}<br>${Object.entries(myLibrary[x])}</p>`;
    }
    return printThis;
}


library.innerHTML = displayLibrary();
displayLibrary();


console.table(myLibrary);

console.log(book1.bookInfo());

*/