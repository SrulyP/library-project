// ========================= Form =========================

const addBookBtn = document.querySelector("#add-book-btn");
const form = document.querySelector("#add-book-dialog");
const formElement = document.querySelector("form");
const confirmBtn = form.querySelector("#confirm-btn");
const cancelBtn = form.querySelector("#cancel-btn");


addBookBtn.addEventListener("click", () => {
    form.showModal();
});

cancelBtn.addEventListener("click", () => {
    form.close();
});

formElement.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = form.querySelector("#title").value;
    const author = form.querySelector("#author").value;
    const pages = form.querySelector("#pages").value;
    const radioElement = form.querySelector("input[name='read']:checked");
    const read = radioElement ? radioElement.value : "no-read";

    addBookToLibrary(title, author, pages, read);
    
    form.close();
    form.reset();
    displayBooks(myLibrary);
});

// ========================= Book Constructor =========================

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// ========================= Add Book =========================

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

// ========================= Display Books =========================

const booksContainer = document.querySelector(".books-container");
const bookCard = document.querySelector(".book-card");


function displayBooks(library) {
    booksContainer.innerHTML = '';
    for (const book of library) {
        let bookCardCopy = bookCard.cloneNode(true);
        bookCardCopy.querySelector(".title-input").textContent = book.title;
        bookCardCopy.querySelector(".author-input").textContent = book.title;
        bookCardCopy.querySelector(".pages-input").textContent = book.title;
        booksContainer.appendChild(bookCardCopy);
    }
}
