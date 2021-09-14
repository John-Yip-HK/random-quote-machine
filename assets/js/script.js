let quote = "";
let author = "";
const textElement = document.getElementById("text");
const authorElement = document.getElementById("author");

const parseSentence = (sentence, placeHolder) =>
  sentence.replace(/\s/g, placeHolder);

const getQuote = () => {
  setTimeout(
    () => {
      fetch("https://api.quotable.io/random?maxLength=50")
        .then((response) => response.json())
        .then((data) => {
          quote = data.content;
          author = data.author;

          textElement.innerHTML = quote;
          textElement.style.opacity = 1;

          authorElement.innerHTML = author;
          authorElement.style.opacity = 1;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    textElement.style.opacity === 0 || authorElement.style.opacity === 0
      ? 0
      : 1000
  );

  if (textElement.style.opacity > 0 || authorElement.style.opacity > 0) {
    textElement.style.opacity = 0;
    authorElement.style.opacity = 0;
  }
};

window.onload = getQuote;

const genPost = (element) => {
  const parsedQuote = parseSentence(quote, "%20");
  const parsedAuthor = parseSentence(author, "");

  if (element.id === "tweet-quote") {
    element.setAttribute(
      "href",
      `https://twitter.com/intent/tweet?text=${parsedQuote}&hashtags=${parsedAuthor}`
    );
  } else if (element.id === "tumblr-quote") {
    const date = new Date();
    let todayStr =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    element.setAttribute(
      "href",
      `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,${todayStr},freeCodeCamp&caption=${parsedAuthor}&content=${parsedQuote}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`
    );
  } else {
    alert("Unknown link is clicked. Please report to us.");
  }
};
