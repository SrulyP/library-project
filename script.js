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
    formElement.reset();
    displayBooks(myLibrary);
});

// ========================= Book Constructor =========================

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

// ========================= Add Book =========================

function addBookToLibrary(title, author, pages, read) {
    title = title.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
    author = author.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

// ========================= Remove Book =========================

function removeBook(bookID) {
    const bookIndex = myLibrary.findIndex(book => book.id === bookID);
    myLibrary.splice(bookIndex, 1);
    displayBooks(myLibrary);

}

// ========================= Display Books =========================

const booksContainer = document.querySelector(".books-container");
const bookCard = document.querySelector(".book-card");


function displayBooks(library) {
    booksContainer.innerHTML = '';
    for (const book of library) {
        let bookCardCopy = bookCard.cloneNode(true);
        bookCardCopy.querySelector(".title-input").textContent = book.title;
        bookCardCopy.querySelector(".author-input").textContent = book.author;
        bookCardCopy.querySelector(".pages-input").textContent = book.pages;
        const removeButton = bookCardCopy.querySelector(".remove-btn");
        removeButton.addEventListener("click", () => {
            removeBook(book.id);
        });
        booksContainer.appendChild(bookCardCopy);
    }
}

// ========================= Example Books =========================

const firstBook = new Book ("The Lighting Thief", "Rick Riordan", 370);
const secondBook = new Book ("Jane Eyre", "Charlotte Brontë", 571);
const thirdBook = new Book ("Alice in Wonderland", "Lewis Carroll", 192);
const fourthBook = new Book ("Twenty Thousand Leagues Under the Sea", "Jules Verne", 270);


myLibrary.push(firstBook);
myLibrary.push(secondBook);
myLibrary.push(thirdBook);
myLibrary.push(fourthBook);

displayBooks(myLibrary);