const titleInput = document.querySelector(".title-input");
const authorInput = document.querySelector(".author-input");
const pagesInput = document.querySelector(".pages-input");

const addBookBtn = document.querySelector(".add-book-btn");
const form = document.querySelector("#add-book-dialog");
const confirmBtn = form.querySelector("#confirmBtn");


addBookBtn.addEventListener("click", () => {
    form.showModal();
});


confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const title = form.querySelector("#title").value;
    const author = form.querySelector("#author").value;
    const pages = form.querySelector("#pages").value;
    const radioElement = form.querySelector("input[name='read']:checked");
    const read = radioElement ? radioElement.value : "no-read";

    addBookToLibrary(title, author, pages, read);
    
    form.close();
    displayBooks(myLibrary);

});


const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
    book = new Book(title, author, pages, read);
    myLibrary.push(book);
}


function displayBooks(library) {
    for (const book of library) {
        book.title
    }
}