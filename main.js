// define global variables
let articles = '';
let category = 'general';
let country = 'us';

// pagination for articles to display only six on page
const pagination = document.getElementById("pagination");

let items_per_page = 6;
let currentPage = 1;

let start = (currentPage - 1) * items_per_page;
let end = start + items_per_page;

// trigger the getArticles function when the page load
getArticles(country,category);
// displayArticles(start, end);
// select all nav links and add click event on it to change the category of newsapi
let navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(function(link) {
  link.addEventListener('click', function (e) {
    category = e.target.textContent;
    getArticles(country,category);
  })
})

// select all dropdown links and add click event on it to change the country of newsapi
let dropdownLinks = document.querySelectorAll('.dropdown .dropdown-item');
dropdownLinks.forEach(function(item) {
  item.addEventListener('click', function (e) {
    console.log(e.target.textContent);
    country = e.target.textContent;
    getArticles(country,category);
  })
})

// function to fetch articles from the newsapi
function getArticles(country,category) {
  fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=86cbbded952d4a029027849d5f0796b4`)
  .then(res => res.json())
  .then(data => {
    articles = data.articles;
    displayArticles(start,end);
    createPagination()
  })
  .catch(err=> console.log(err))
}

// function to display articles in the page
function displayArticles(start, end) {
  let temp = "";
  document.querySelector('.articles .row').innerHTML = "";
  articles.slice(start, end).forEach((article) => {
    temp += `
    <div class="col-md-6 col-lg-4">
      <div class="article text-center">
        <img class="img-fluid" src="${article.urlToImage == null ? 'https://placekitten.com/640/360': article.urlToImage }" alt="">
        <h2>${article.title}</h2>
        <p>${article.description}</p>
      </div>
    </div>
    `
    document.querySelector('.articles .row').innerHTML = temp
  });
  
}

function createPagination() {
  pagination.innerHTML = "";
  let pages = Math.ceil(articles.length / items_per_page);
  for (let i = 0; i < pages; i++) {
    pagination.innerHTML += `<button onclick="paginateItems(${i + 1})">${i + 1}</button>`;
  }
}

function paginateItems(c) {
  let start = (c - 1) * items_per_page;
  let end = start + items_per_page;
  displayArticles(start, end);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}




// if(articles.length > items_per_page) {
//   createPagination()
// }
