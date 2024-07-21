$(document).ready(function () {
    let bookData = [];//array to store json file data
    let displayedBooks = 0;//counter to see loaded books
    const booksPerLoad = 2; // number of books we are addingg

  
    $.ajax({
        url: './books.json',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            bookData = data;//we are storing the response data in bookdata array
            loadBooks();//calling loadbooks function if success
        },
        error: function (error) {
            console.error('Error fetching book data:', error);
        }
    });

    // Load books function
    function loadBooks() {
        //we are slicing from bookData initially it will be(0,0+2) so bookstodisplay will have only 2 books to display
        const booksToDisplay = bookData.slice(displayedBooks, displayedBooks + booksPerLoad);
        booksToDisplay.forEach(book => {
            const bookCard = `
            <div class="single-card">
                <div class="card-img">
                    <img src="${book.image}" alt="Book Image">
                </div>
                <div class="card-text">
                    <p>Book Title:${book.title}</p><p>Author: ${book.author}</p>
                    <p>Description:${book.description}</p>
                </div>
            </div>
            `;
            $('.card-container').append(bookCard);
        });
        displayedBooks += booksPerLoad;//incrementing so on loadmore call we can display next two books
    }

    // Handle search input
    $('#search').on('input', function () {
        const query = $(this).val().toLowerCase();//storing title in query variable
        if (query === "") {
        $('#load-more').show();
            $('.card-container').empty();
            displayedBooks = 0;//if the search bar is empty by user after searching then displaying initial two books again
            loadBooks();
        } else {
            $('#load-more').hide();
            const filteredBooks = bookData.filter(book => 
                book.title.toLowerCase().includes(query)
            );
            $('.card-container').empty();
            displayedBooks = 0;
            filteredBooks.forEach(book => {
                const bookCard = `
                     <div class="single-card">
                <div class="card-img">
                    <img src="${book.image}" alt="Book Image">
                </div>
                <div class="card-text">
                    <p>Book Title:${book.title}</p><p>Author: ${book.author}</p>
                    <p>Description:${book.description}</p>
                </div>
            </div>
                `;
                $('.card-container').append(bookCard);
            });
        }
    });


    // Load more books on button click
    $('#load-more').on('click', function () {
        loadBooks();
    });

    $('#home-button').on('click', function() {
        window.location.href = 'index.html'; 
    });

    $('#book-button').on('click', function() {
        window.location.href = 'books.html'; // Redirect to book.html
    });
});
