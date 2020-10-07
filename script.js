// BOOK CLASS
class Book {
    constructor(title, author, pages, isbn, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.isbn = isbn
        this.read = read
    }
}

// UI CLASS
class UI {
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToLibrary(book));
    }

    // Create elements and add book to UI (my library)
    static addBookToLibrary(book) {
        const library = document.querySelector('#library'); 

        const row = document.createElement('tr');
        row.dataset.isbn = book.isbn;

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${book.isbn}</td>
            <td>${book.read}</td>
            <td><button class="remove-btn" data-isbn="${book.isbn}">Remove</button></td>
        `;

        library.appendChild(row);
    }

    // Show error or success message
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

    static checkRadioButtonValue(read) {
        if (read.checked === true) {
            return 'yes';
        } else {
            return 'no';
        }
    }

    // Remove book from UI
    static removeBook(target) {
        if (target.classList.contains('remove-btn')) {
        target.parentElement.parentElement.remove();
        } else {
            return;
        }
    }
}

// STORE LIBRARY CLASS (
// local storage can't store arrays, only strings
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            // Convert string to array
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        // Convert array to string
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        // Remove by ISBN because it's unique
        const books = Store.getBooks();
        // Loop through books and remove book with ISBN-match
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        // Convert array to string
        localStorage.setItem('books', JSON.stringify(books));
    }
}

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
    let read = document.querySelector('#read');

    // Check radio button value
    read = UI.checkRadioButtonValue(read)

    // Check if field is empty
    if (title === '' || 
        author === '' || 
        pages === '' ||
        isbn === '') {
        
        // Initiate error message
        UI.alertMessage('Please fill in all fields', 'error');

    } else {

        // Initiate success message
        UI.alertMessage('Book added', 'success');

        // Create new book with form input
        let book = new Book(title, author, pages, isbn, read);

        // Add book to UI (my library)
        UI.addBookToLibrary(book);

        // Add book to local storage
        Store.addBook(book);

        // Clear UI form fields
        form.reset();
        }

});

// Event: remove a book
const library = document.querySelector('#library');
library.addEventListener('click', (e) => {
    // Remove from UI
    UI.removeBook(e.target);

    // Remove from local storage
    Store.removeBook( e.target.dataset.isbn )

    // Success message
    UI.alertMessage('Book removed', 'success');
});