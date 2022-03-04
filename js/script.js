import { baseUrl } from "./components/baseUrl.js";
import { displayMessage } from "./utils/displayMessage.js";
import { renderArticles } from "./utils/renderArticles.js";
import { filterArticles } from "./utils/filterArticles.js";
import { createLoginLink } from "./utils/dynamicLoginMenu.js";

const url = baseUrl + "articles/";

createLoginLink();

(async function () {
    try {
        const response = await fetch(url);
        const articles = await response.json();

        renderArticles(articles);
        filterArticles(articles);

    } catch (error) {
        console.log(error);
        displayMessage("error", error, ".articles-container");
    }
})();