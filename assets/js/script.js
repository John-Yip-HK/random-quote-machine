let quote = "";
let author = "";

const getQuote = () => {
  fetch("https://api.quotable.io/random?maxLength=50")
    .then((response) => response.json())
    .then((data) => {
      quote = data.content;
      author = data.author;

      document.getElementById("text").innerHTML = quote;
      document.getElementById("author").innerHTML = author;
    })
    .catch((err) => console.log(err));
};

window.onload = getQuote;
