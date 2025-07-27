// ========================= Book Constructor =========================

function Book(title, author, pages, year, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.read = read;
    this.id = crypto.randomUUID();
}

// ========================= Example Books =========================

const firstBook = new Book("The Lighting Thief", "Rick Riordan", 370, "June 28, 2005", 'yes-read');
const secondBook = new Book("Jane Eyre", "Charlotte Brontë", 571, "October 19, 1847", 'no-read');
const thirdBook = new Book("Alice in Wonderland", "Lewis Carroll", 192, "July 4, 1865", 'yes-read');
const fourthBook = new Book("Twenty Thousand Leagues Under the Sea", "Jules Verne", 270, "March, 1869", 'no-read');
const fifthBook = new Book("Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae quod illum eius, consectetur aut, voluptatibus sapiente recusandae amet fugiat totam quam ipsam quae nihil, architecto eligendi officia. Pariatur modi, sit atque tempore, magnam dolor dolores iure quae labore adipisci nobis. Qui quod veritatis distinctio totam quibusdam fugiat fugit. Quae voluptatum reprehenderit, inventore veritatis ducimus accusantium, nostrum provident molestiae aliquam possimus hic! Deleniti animi quibusdam reiciendis voluptatum exercitationem architecto assumenda, cupiditate, sed, numquam quaerat a praesentium laudantium iste amet iure accusantium.", "Lorem Ipsum", 980, "January 10, 1920", 'no-read');

// ========================= Library App =========================

const libraryApp = {
    myLibrary: [],
    storageKey: 'libraryBooks',
    
    init: function() {
        this.loadFromStorage();
        this.cacheDom();
        this.bindEvents();
        this.render();
    },

// ========================= localStorage Methods =========================
    
    loadFromStorage: function() {
        const storedBooks = localStorage.getItem(this.storageKey);
        if (storedBooks) {
            const parsedBooks = JSON.parse(storedBooks);
            this.myLibrary = parsedBooks.map(bookData => {
                const book = new Book(bookData.title, bookData.author, bookData.pages, bookData.year, bookData.read);
                book.id = bookData.id;
                return book;
            });
        } else {
            // If there are no stored books, use example books
            this.myLibrary = [firstBook, secondBook, thirdBook, fourthBook, fifthBook];
            this.saveToStorage();
        }
    },

    saveToStorage: function() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.myLibrary));
    },

    clearStorage: function() {
        localStorage.removeItem(this.storageKey);
        this.myLibrary = [];
        this.render();
    },

    // ========================= Original Methods =========================

    cacheDom: function() {
        this.addBookBtn = document.querySelector("#add-book-btn");
        this.form = document.querySelector("#add-book-dialog");
        this.formElement = document.querySelector("form");
        this.confirmBtn = this.form.querySelector("#confirm-btn");
        this.cancelBtn = this.form.querySelector("#cancel-btn");
        this.booksContainer = document.querySelector(".books-container");
        this.bookCard = document.querySelector(".book-card");
    },

    bindEvents: function() {
        this.addBookBtn.addEventListener("click", () => this.form.showModal());
        this.cancelBtn.addEventListener("click", () => this.form.close());
        this.formElement.addEventListener("submit", (e) => this.handleForm(e));
    },

    innerCache: function(bookCardCopy, book) { 
        bookCardCopy.querySelector(".title-input").textContent = book.title;
        bookCardCopy.querySelector(".author-input").textContent = book.author;
        bookCardCopy.querySelector(".pages-input").textContent = book.pages;
        bookCardCopy.querySelector(".year-input").textContent = this.changeDateFormat(book.year);
        
        const removeButton = bookCardCopy.querySelector(".remove-btn");
        const readButton = bookCardCopy.querySelector(".read-btn");
        
        return { removeButton, readButton };
    },

    innerBindEvents: function(buttons, book) {
        buttons.removeButton.addEventListener("click", () => this.removeBook(book.id));

        buttons.readButton.addEventListener("click", () => {
            if (book.read === "no-read") {
                book.read = "yes-read";
                buttons.readButton.textContent = 'Read';
            } else {
                book.read = "no-read";
                buttons.readButton.textContent = 'Not Read';
            }
            this.saveToStorage();
        });
    },
    
    handleForm: function(event) {
        event.preventDefault();

        const title = this.form.querySelector("#title").value;
        const author = this.form.querySelector("#author").value;
        const pages = this.form.querySelector("#pages").value;
        const year = this.form.querySelector("#year").value;
        const read = this.form.querySelector("input[name='read']:checked").value;

        this.addBook(title, author, pages, year, read);

        this.form.close();
        this.formElement.reset();
        this.render();
    },

    render: function() {
        this.booksContainer.innerHTML = '';
        
        for (const book of this.myLibrary) {
            let bookCardCopy = this.bookCard.cloneNode(true);
            const buttons = this.innerCache(bookCardCopy, book);

            if (book.read === "yes-read") {
                bookCardCopy.querySelector(".read-btn").textContent = "Read";
            } else {
                bookCardCopy.querySelector(".read-btn").textContent = "Have Not Read";
            }
            
            this.innerBindEvents(buttons, book);
            this.booksContainer.appendChild(bookCardCopy);
        }
    },

    addBook: function(title, author, pages, year, read) {
        title = this.capitalize(title);
        author = this.capitalize(author);
        const book = new Book(title, author, pages, year, read);
        this.myLibrary.push(book);
        this.saveToStorage();
    },

    removeBook: function(bookID) {
        const bookIndex = this.myLibrary.findIndex(book => book.id === bookID);
        if (bookIndex !== -1) {
            this.myLibrary.splice(bookIndex, 1);
            this.saveToStorage();
            this.render(); 
        }
    },

    capitalize: function(string) {
        return string.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
    },

    changeDateFormat: function(dateInput) {
        const date = new Date(dateInput);
        
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        
        return date.toLocaleDateString('en-US', options);
    }
};

libraryApp.init();