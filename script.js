const myLibrary = [];

function Book(title, author, pages, read) {
    self.title = title;
    self.author = author;
    self.pages = pages;
    self.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    title = new Book(title, author, pages, read);
    myLibrary.push(title);
}