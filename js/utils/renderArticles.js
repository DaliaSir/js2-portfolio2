import { articlesContainer } from "../components/elements.js";
import { iconClickEvent } from "./iconClickEvent.js";
import { getFromStorage } from "./localStorage.js";

export function renderArticles(articles) {
    articlesContainer.innerHTML = "";

    const favArticles = getFromStorage("favourite-articles");

    articles.forEach((article) => {
        const isFavourite = favArticles.find((fav) => {
            return parseInt(fav.id) === article.id;
        });

        const iconClass = isFavourite ? "fa" : "far";

        const articleTitle = article.title ? article.title : "Unknown title";
        const articleSummary = article.summary ? article.summary : "No summary";
        const articleAuthor = article.author ? article.author : "Unknown author";

        articlesContainer.innerHTML += `
            <div class="col p-3">
                <div class="card">
                    <div class="card-body article">
                        <a href="edit.html?id=${article.id}">
                            <h5 class="card-title">${articleTitle}</h5>
                            <p class="card-text">${articleSummary}</p>
                            <p class="card-footer bg-transparent fst-italic m-0">${articleAuthor}</p>
                        </a>
                        <i class="${iconClass} fa-heart" data-id="${article.id}" data-title="${articleTitle}" data-summary="${articleSummary}" data-author="${articleAuthor}"></i>
                    </div>
                </div>
            </div>
            `;
        iconClickEvent();
    });

}

