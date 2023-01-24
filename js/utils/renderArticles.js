import { articlesContainer } from "../components/elements.js";
import { iconClickEvent } from "./iconClickEvent.js";
import { getFromStorage } from "./localStorage.js";

export function renderArticles(articles) {
  articlesContainer.innerHTML = "";
  const favArticles = getFromStorage("favourite-articles");
  const data = articles.data;

  data.forEach((article) => {
    const isFavourite = favArticles.find((fav) => {
      return parseInt(fav.id) === article.id;
    });

    const iconClass = isFavourite ? "fa" : "far";
    const articleTitle = article.attributes.title ? article.attributes.title : "Unknown title";
    const articleSummary = article.attributes.summary ? article.attributes.summary : "No summary";
    const articleAuthor = article.attributes.author ? article.attributes.author : "Unknown author";

    const { pathname } = document.location;

    if (pathname === "/edit-articles.html") {
      articlesContainer.innerHTML += `
        <div class="col p-3">
          <div class="card edit-articles-card">
            <div class="card-body article">
              <a href="edit.html?id=${article.id}" title="Edit Article">
                <div class="card__hover-container">
                  <p class="card__hover-container-text">Edit Article</p>
                </div>
                <h5 class="card-title">${articleTitle}</h5>
                <p class="card-text">${articleSummary}</p>
                <p class="card-footer bg-transparent fst-italic m-0">${articleAuthor}</p>
              </a>
            </div>
          </div>
        </div>
			`;
    } else {
      articlesContainer.innerHTML += `
        <div class="col p-3">
          <div class="card">
            <div class="card-body article">
              <h5 class="card-title">${articleTitle}</h5>
              <p class="card-text">${articleSummary}</p>
              <p class="card-footer bg-transparent fst-italic m-0">${articleAuthor}</p>
              <i class="${iconClass} fa-heart" data-id="${article.id}" data-title="${articleTitle}" data-summary="${articleSummary}" data-author="${articleAuthor}"></i>
            </div>
          </div>
        </div>
			`;
      iconClickEvent();
    }
  });
}

