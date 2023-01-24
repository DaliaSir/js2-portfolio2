import { search } from "../components/elements.js";
import { renderArticles } from "./renderArticles.js";
import { displayMessage } from "./displayMessage.js";
import { noResults } from "../components/messages.js";

export function filterArticles(articles) {
  search.onkeyup = (event) => {
    const searchValue = event.target.value.replace(/\s/g, "").toLowerCase();
    const data = articles.data;
    const filteredValues = data.filter((article) => {
      if (article.attributes.author.replace(/\s/g, "").toLowerCase().includes(searchValue)) {
        return true;
      }
    });
    const filteredArticles = { data: filteredValues }
    renderArticles(filteredArticles);

    if (filteredValues.length === 0) {
      displayMessage("noResult-message", noResults, ".articles-container");
    }
  }
  renderArticles(articles);
}

