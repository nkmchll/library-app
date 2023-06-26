// array to store books
let myLibrary = [];

// object constructor
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// change status: 'Not Read' or 'Read'
Book.prototype.toggleRead = function(){
    this.read = !this.read;
}

function toggleRead(index){
    myLibrary[index].toggleRead();
    render();
}

// function to display book to the library
function render(){
    let library = document.querySelector("#Library");
    library.innerHTML = "";
    // iterate through the array
    for (let i = 0; i < myLibrary.length; i++){
        let book = myLibrary[i];
        let bookEl = document.createElement("div");
        bookEl.innerHTML = `
            <div class = 'card-container'> 
                <div class = 'card-content'>
                    <div class = 'card-header'>
                        <h2 class = "title">${book.title}</h2>
                        <h5 class = "author">by ${book.author}</h5>
                    </div>
                    <div class = "card-body">
                        <p>${book.pages} pages</p>
                        <p class = "read-status">${book.read ? "Read" : "Not Read Yet"}</p>
                        <button class = "remove-btn" onclick="removeBook(${i})">Remove Book</button>
                        <button class = "toggle-read-btn" onclick = "toggleRead(${i})">Change Status</button>
                    </div>
                </div>
            </div>`;
        library.appendChild(bookEl);
    }
}


// if library has no books yet, display a message
function checkIfEmpty(){
    if (myLibrary.length == 0){
        let library = document.querySelector("#Library");
        library.innerHTML = "<div class='status'>No books to display. Add a book now!</div>";
    }
}

// function to remove book from the library
function removeBook(index){
    myLibrary.splice(index,1);
    render();
    checkIfEmpty();
}

// function for adding a new book to library array and display 
function addBookLibrary(){
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let read = document.querySelector('#read').checked;
    let newBook = new Book(title,author,pages,read);
    myLibrary.push(newBook);
    render();
    reset();
}

function reset(){
    let titleInput = document.querySelector('#title');
    let authorInput = document.querySelector('#author');
    let pagesInput = document.querySelector('#pages');
    let readInput = document.querySelector('#read');

    // Reset form fields to their default values
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    readInput.checked = false;
}

// display form when button 'Add a Book' is clicked
// remove form when 'cancel' button is clicked
let newBookButton = document.querySelector('#new-book-btn');
newBookButton.addEventListener("click", function(){
    let newBookForm = document.querySelector('#new-book-form');
    newBookForm.style.display = "block";

    let cancelButton = document.querySelector('.cancel-btn');
    cancelButton.addEventListener("click", function(){
        reset();
        newBookForm.style.display = "none";
    })
});

// Add book to library when 'Add Book' in the form is clicked
document.querySelector('#new-book-form').addEventListener("submit", function(event){
    event.preventDefault();
    addBookLibrary();
})

let book1 = new Book("It Ends With Us", "Colleen Hoover", 384, false)
console.log(book1);
myLibrary.push(book1);
render();

let book2 = new Book("The Seven Husbands of Evelyn Hugo", "Taylor Jenkins Reid", 400, true)
console.log(book1);
myLibrary.push(book2);
render();

console.log(myLibrary.length)