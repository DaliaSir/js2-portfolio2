import { createLoginLink } from "./utils/dynamicLoginMenu.js";
import { baseUrl } from "./components/baseUrl.js";
import { formMessageContainer } from "./components/elements.js";
import { displayMessage } from "./utils/displayMessage.js";
import { noTitle, noSummary, noAuthor, addedArticle } from "./components/messages.js";
import { getToken } from "./utils/saveUser.js";

createLoginLink();

const addForm = document.querySelector(".add-form");
const addButton = document.querySelector(".addButton");
const title = document.querySelector("#title");
const summary = document.querySelector("#summary");
const author = document.querySelector("#author");
const formMessage = document.querySelector(".form-message");

addForm.addEventListener("submit", e => {
  e.preventDefault();
  formMessage.innerHTML = "";

  const titleValue = title.value.trim();
  const summaryValue = summary.value.trim();
  const authorValue = author.value.trim();

  if (titleValue.length === 0) {
    return displayMessage("warning", noTitle, formMessageContainer);
  } else if (summaryValue.length === 0) {
    return displayMessage("warning", noSummary, formMessageContainer);
  } else if (authorValue.length === 0) {
    return displayMessage("warning", noAuthor, formMessageContainer);
  }

  addArticle(titleValue, summaryValue, authorValue);
});

async function addArticle(title, summary, author) {
  const url = baseUrl + "articles";
  const articleData = JSON.stringify({ data: { title: title, summary: summary, author: author } });
  const token = getToken();
  const options = {
    method: "POST",
    body: articleData,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };

  console.log(options);

  try {
    addButton.innerHTML = "Adding...";
    const response = await fetch(url, options);
    const json = await response.json();
    const data = json.data.attributes;
    if (data.createdAt) {
      displayMessage("success", addedArticle, formMessageContainer);
      addButton.innerHTML = "Add";
      window.scrollTo(top);
      addForm.reset();
    }
    if (json.error) {
      displayMessage("error", json.message, formMessageContainer);
      window.scrollTo(top);
    }
  } catch (error) {
    console.log(error);
    displayMessage("error", error, formMessageContainer);
    window.scrollTo(top);
  }
}