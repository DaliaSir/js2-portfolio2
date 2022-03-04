import { createLoginLink } from "./utils/dynamicLoginMenu.js";
import { baseUrl } from "./components/baseUrl.js";
import { formMessageContainer } from "./components/elements.js";
import { displayMessage } from "./utils/displayMessage.js";
import { noTitle, noSummary, noAuthor, updatedArticle } from "./components/messages.js";
import { getToken } from "./utils/saveUser.js";
import deleteButton from "./utils/deleteButton.js";

createLoginLink();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
  document.location.href = "/";
}

const articleUrl = baseUrl + "articles/" + id;

const editForm = document.querySelector(".edit-form");
const editButton = document.querySelector(".editButton");
const title = document.querySelector("#title");
const summary = document.querySelector("#summary");
const author = document.querySelector("#author");
const idInput = document.querySelector("#id");
const formMessage = document.querySelector(".form-message");
const loader = document.querySelector(".loader");

(async () => {
  try {
    const response = await fetch(articleUrl);
    const json = await response.json();

    const breadcrumbName = document.querySelector(".breadcrumb-item.active");
    breadcrumbName.innerHTML = `${json.title}`;

    title.value = json.title;
    summary.value = json.summary;
    author.value = json.author;
    idInput.value = json.id;

    deleteButton(json.id);
  } catch (error) {
    console.log(error);
  } finally {
    loader.style.display = "none";
    editForm.style.display = "block";
  }
})();

editForm.addEventListener("submit", e => {
  e.preventDefault();
  formMessage.innerHTML = "";

  const titleValue = title.value.trim();
  const summaryValue = summary.value.trim();
  const authorValue = author.value.trim();
  const idValue = idInput.value;

  if (titleValue.length === 0) {
    return displayMessage("warning", noTitle, formMessageContainer);
  } else if (summaryValue.length === 0) {
    return displayMessage("warning", noSummary, formMessageContainer);
  } else if (authorValue.length === 0) {
    return displayMessage("warning", noAuthor, formMessageContainer);
  }

  editArticle(titleValue, summaryValue, authorValue, idValue);
});

async function editArticle(title, summary, author, id) {
  const url = baseUrl + "articles/" + id;
  const articleData = JSON.stringify({ title: title, summary: summary, author: author });
  const token = getToken();
  const options = {
    method: "PUT",
    body: articleData,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
  try {
    editButton.innerHTML = "Updating...";
    const response = await fetch(url, options);
    const json = await response.json();
    if (json.updated_at) {
      displayMessage("success", updatedArticle, formMessageContainer);
      editButton.innerHTML = "Update";
      window.scrollTo(top);
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