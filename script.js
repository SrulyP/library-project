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
    const year = form.querySelector("#year").value;
    const read = form.querySelector("input[name='read']:checked");

    addBookToLibrary(title, author, pages, year, read);
    
    form.close();
    formElement.reset();
    displayBooks(myLibrary);
});

// ========================= Book Constructor =========================

const myLibrary = [];

function Book(title, author, pages, year, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.read = read;
    this.id = crypto.randomUUID();
}

// ========================= Change Year Format =========================


function changeDateFormat(dateInput) {
    const date = new Date(dateInput);
    
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    return date.toLocaleDateString('en-US', options);
}

// ========================= Add Book =========================

function addBookToLibrary(title, author, pages, year, read) {
    title = title.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
    author = author.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
    let book = new Book(title, author, pages, year, read);
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
        bookCardCopy.querySelector(".year-input").textContent = changeDateFormat(book.year);

        if (book.read == "yes-read") {
            bookCardCopy.querySelector(".read-btn").textContent = "Read"
        } else {
            bookCardCopy.querySelector(".read-btn").textContent = "Have Not Read"
        }
        

        const removeButton = bookCardCopy.querySelector(".remove-btn");
        removeButton.addEventListener("click", () => {
            removeBook(book.id);
        });

        const readButton = bookCardCopy.querySelector(".read-btn");
        readButton.addEventListener("click", () => {
            if (book.read === "no-read") {
                book.read = "yes-read";
                readButton.textContent = 'Read';
            } else {
                book.read = "no-read";
                readButton.textContent = 'Have Not Read';
            }
        });

        booksContainer.appendChild(bookCardCopy);
    }
}

// ========================= Example Books =========================

const firstBook = new Book ("The Lighting Thief", "Rick Riordan", 370, "June 28, 2005", 'yes-read');
const secondBook = new Book ("Jane Eyre", "Charlotte Brontë", 571, "October 19, 1847", 'no-read');
const thirdBook = new Book ("Alice in Wonderland", "Lewis Carroll", 192, "July 4, 1865", 'yes-read');
const fourthBook = new Book ("Twenty Thousand Leagues Under the Sea", "Jules Verne", 270, "March, 1869", 'no-read');
const fifthBook = new Book ("Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae quod illum eius, consectetur aut, voluptatibus sapiente recusandae amet fugiat totam quam ipsam quae nihil, architecto eligendi officia. Pariatur modi, sit atque tempore, magnam dolor dolores iure quae labore adipisci nobis. Qui quod veritatis distinctio totam quibusdam fugiat fugit. Quae voluptatum reprehenderit, inventore veritatis ducimus accusantium, nostrum provident molestiae aliquam possimus hic! Deleniti animi quibusdam reiciendis voluptatum exercitationem architecto assumenda, cupiditate, sed, numquam quaerat a praesentium laudantium iste amet iure accusantium.", "Lorem Ipsum", 980, "January 10, 1920",'no-read');


myLibrary.push(firstBook);
myLibrary.push(secondBook);
myLibrary.push(thirdBook);
myLibrary.push(fourthBook);
myLibrary.push(fifthBook);

displayBooks(myLibrary);




let book = {
    myLibrary: [firstBook, secondBook, thirdBook, fourthBook, fifthBook],
    init: function () {
        this.cacheDom();
        this.bindEvents();
        this.render();
    },

    cacheDom: function () {
        addBookBtn = document.querySelector("#add-book-btn");
        form = document.querySelector("#add-book-dialog");
        formElement = document.querySelector("form");
        confirmBtn = form.querySelector("#confirm-btn");
        cancelBtn = form.querySelector("#cancel-btn");
        title = form.querySelector("#title").value;
        author = form.querySelector("#author").value;
        pages = form.querySelector("#pages").value;
        year = form.querySelector("#year").value;
        read = form.querySelector("input[name='read']:checked");
    },

    bindEvents: function () {
        addBookBtn.addEventListener("click", () => form.showModal());
        cancelBtn.addEventListener("click",() => form.close());
        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
                title = form.querySelector("#title").value;
                author = form.querySelector("#author").value;
                pages = form.querySelector("#pages").value;
                year = form.querySelector("#year").value;
                read = form.querySelector("input[name='read']:checked");

    addBookToLibrary(title, author, pages, year, read);
    
    form.close();
    formElement.reset();
    displayBooks(myLibrary);
});
    },

    render: function () {

    },

    addBook: function () {

    },

    removeBook: function () {

    },

    capitalize: function (string) {
        string.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
    }
    

}