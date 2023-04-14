let userInput = document.getElementById('searchInput');
let searchResults = document.getElementById('searchResults');
let spinner = document.getElementById('spinner');

function displayResults(result) {
    let {
        imageLink,
        author
    } = result;
    let bookContainer = document.createElement('div');
    bookContainer.classList.add('col-6');
    searchResults.appendChild(bookContainer);

    let image = document.createElement('img');
    image.src = imageLink;
    image.classList.add('book-image');
    bookContainer.appendChild(image);

    let authorName = document.createElement('p');
    authorName.textContent = author;
    authorName.classList.add('author-name');
    bookContainer.appendChild(authorName);
}

function createResults(search_results) {
    spinner.classList.add('d-none');
    if (search_results.length === 0) {
        let heading = document.createElement('h1');
        heading.textContent = 'No results found';
        heading.classList.add('col-12', 'books-heading', 'text-center');
        searchResults.appendChild(heading);
    } else {
        let heading = document.createElement('h1');
        heading.textContent = 'Popular Books';
        heading.classList.add('col-12', 'books-heading');
        searchResults.appendChild(heading);
        for (let result of search_results) {
            displayResults(result);
        }
    }
}

function getResults() {
    let url = 'https://apis.ccbp.in/book-store?title=' + userInput.value;
    let options = {
        method: 'GET'
    };
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsondata) {
            console.log(jsondata);
            let {
                search_results
            } = jsondata;
            createResults(search_results);
        });
}

userInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        spinner.classList.remove('d-none');
        getResults();
    }
});