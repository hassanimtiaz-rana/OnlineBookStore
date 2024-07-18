$(document).ready(function () {
    let bookData = [];
    let displayedBooks = 0;
    const booksPerLoad = 2; // Adjust this number based on how many books you want to load at once

    // Fetch the initial book data
    $.ajax({
        url: './books.json',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            bookData = data;
            loadBooks();
        },
        error: function (error) {
            console.error('Error fetching book data:', error);
        }
    });

    // Load books function
    function loadBooks() {
        const booksToDisplay = bookData.slice(displayedBooks, displayedBooks + booksPerLoad);
        booksToDisplay.forEach(book => {
            const bookCard = `
                <div class="single-card">
                    <div class="card-img">
                        <img src="${book.image}" alt="Book Image">
                    </div>
                    <div class="card-text">
                        <p>${book.title} By ${book.author}</p>
                        <p>${book.description}</p>
                    </div>
                </div>
            `;
            $('#book-list').append(bookCard);
        });
        displayedBooks += booksPerLoad;
    }

    // Handle search input
    $('#search').on('input', function () {
        const query = $(this).val().toLowerCase();
        const filteredBooks = bookData.filter(book => 
            book.title.toLowerCase().includes(query) || 
            book.author.toLowerCase().includes(query) || 
            book.description.toLowerCase().includes(query)
        );
        $('#book-list').empty();
        displayedBooks = 0;
        filteredBooks.forEach(book => {
            const bookCard = `
                <div class="single-card">
                    <div class="card-img">
                        <img src="${book.image}" alt="Book Image">
                    </div>
                    <div class="card-text">
                        <p>${book.title} By ${book.author}</p>
                        <p>${book.description}</p>
                    </div>
                </div>
            `;
            $('#book-list').append(bookCard);
        });
    });

    // Load more books on button click
    $('#load-more').on('click', function () {
        loadBooks();
    });
});
