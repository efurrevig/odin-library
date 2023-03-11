let myLibrary = []
function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function addBookToLibrary(event) {
    event.preventDefault();

    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('numPages').value;
    let newBook = new Book(title, author, pages);

    myLibrary.push(newBook);

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('numPages').value = '';

    displayBooks();

}

function displayBooks() {
    let bookList = document.getElementById('bookList');
    bookList.innerHTML = '';
    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        let bookDiv = document.createElement('div');
        bookDiv.dataset.indexValue = i;
        bookDiv.textContent = 
                `${book.title} by ${book.author}, ${book.pages} pages, ${book.read ? 'read' : 'not read'}`;
        addRemoveButton(bookDiv);
        addReadButton(bookDiv);
        bookList.appendChild(bookDiv);
    }
}

function addRemoveButton(bookDiv) {
    let removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
        removeBook(bookDiv.dataset.indexValue);
    });
    bookDiv.appendChild(removeButton);
}

function addReadButton(bookDiv) {
    let readButton = document.createElement('button');
    readButton.textContent = 'Read';
    readButton.addEventListener('click', () => {
        readBook(bookDiv.dataset.indexValue);
    });
    bookDiv.appendChild(readButton);
}

function readBook(index) {
    myLibrary[index].toggleRead();
    displayBooks();
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

let bookForm = document.getElementById('addBookForm');
bookForm.addEventListener('submit', addBookToLibrary);