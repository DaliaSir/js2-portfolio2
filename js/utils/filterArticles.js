import { search } from "../components/elements.js";
import { renderArticles } from "./renderArticles.js";
import { displayMessage } from "./displayMessage.js";
import { noResults } from "../components/messages.js";

export function filterArticles(articles) {
    search.onkeyup = (event) => {
        const searchValue = event.target.value.replace(/\s/g, "").toLowerCase();

        const filteredValues = articles.filter((article) => {
            if (article.author.replace(/\s/g, "").toLowerCase().includes(searchValue)) {
                return true;
            }
        });

        renderArticles(filteredValues);

        if (filteredValues.length === 0) {
            displayMessage("", noResults, ".articles-container");
        }
    }

    renderArticles(articles);
}

