// define global variables
let articles = '';
let category = 'general';
let country = 'us';

// trigger the getArticles function when the page load
getArticles(country,category);

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
    displayArticles();
  })
  .catch(err=> console.log(err))
}

// function to display articles in the page
function displayArticles() {
  let temp = "";
  articles.forEach((article) => {
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