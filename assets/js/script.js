let quote = "";
let author = "";
const textElement = document.getElementById("text");
const authorElement = document.getElementById("author");
const transitionDuration = 1; // in seconds

let currColor = null;
const baseColor = "#495057";
let prevColorId = -1;
const colors = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857",
];

const getWindowWidth = () =>
  Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

const parseSentenceWhiteSpace = (sentence, placeHolder) =>
  sentence.replace(/\s/g, placeHolder);

const getQuote = () => {
  setTimeout(
    () => {
      let url = "https://api.quotable.io/random";
      if (getWindowWidth() < 992) url += "?maxLength=50";

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          quote = data.content;
          author = data.author;

          textElement.innerHTML = quote;
          textElement.style.opacity = 1;

          authorElement.innerHTML = author;
          authorElement.style.opacity = 1;

          let colorId = -1;

          do {
            colorId = Math.floor(Math.random() * colors.length);
          } while (prevColorId === colorId);

          prevColorId = colorId;
          currColor = colors[colorId];

          document.body.style.backgroundColor = currColor;
          document.body.style.color = currColor;
          document.getElementById("quote-box").style.color = currColor;
          document.getElementById("new-quote").style.backgroundColor =
            currColor;
          document.getElementById("new-quote").style.borderColor = currColor;
          for (let icon of document.getElementsByClassName("fab")) {
            icon.style.color = currColor;
          }
        })
        .catch((err) => {
          alert(
            `${err.message}. Please check your network connection and try again.`
          );
        });
    },
    textElement.style.opacity === 0 || authorElement.style.opacity === 0
      ? 0
      : transitionDuration * 1000
  );

  if (textElement.style.opacity > 0 || authorElement.style.opacity > 0) {
    textElement.style.opacity = 0;
    authorElement.style.opacity = 0;
  }
};

const changeIconMargin = () => {
  if (getWindowWidth() >= 568) {
    for (let icon of document.getElementsByClassName("fab")) {
      icon.style.display = "inline block";
      icon.style.margin = "0 6px 0 0";
    }
  } else {
    for (let icon of document.getElementsByClassName("fab")) {
      icon.style.display = "inline";
      icon.style.margin = "0";
    }
  }
};

// Init function.
window.onload = () => {
  document.body.style.transition = "background-color 1s, color 1s";
  document.getElementById("quote-box").style.transition = "color 1s";
  document.getElementById("new-quote").style.transition =
    "background-color 1s, border-color 1s, opacity 0.3s";
  textElement.style.transition = "opacity 1s";
  authorElement.style.transition = "opacity 1s";
  for (let icon of document.getElementsByClassName("fab")) {
    icon.style.transition = "opacity 0.3s, color 1s";
  }

  window.addEventListener("resize", changeIconMargin);

  changeIconMargin();
  getQuote();
};

const genPost = (element) => {
  const parsedQuote = parseSentenceWhiteSpace(quote, "%20");
  const parsedAuthor = parseSentenceWhiteSpace(author, "");

  if (element.id === "tweet-quote") {
    element.setAttribute(
      "href",
      element.href + `?text=${parsedQuote}&hashtags=${parsedAuthor}`
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

  element.style.color = currColor;
};
