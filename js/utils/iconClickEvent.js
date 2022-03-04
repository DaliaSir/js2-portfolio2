import { getFromStorage, saveToStorage } from "./localStorage.js";

export function iconClickEvent() {
    const favIcons = document.querySelectorAll(".article i");

    favIcons.forEach((icon) => {
        icon.addEventListener("click", handleClick);
    });

    function handleClick() {
        this.classList.toggle("fa");
        this.classList.toggle("far");

        const id = this.dataset.id;
        const title = this.dataset.title;
        const summary = this.dataset.summary;
        const author = this.dataset.author;

        const currentFavs = getFromStorage("favourite-articles");

        const articleIsFav = currentFavs.find((fav) => {
            return fav.id === id;
        });

        if (!articleIsFav) {
            const article = { id: id, title: title, summary: summary, author: author };
            currentFavs.push(article);
            saveToStorage("favourite-articles", currentFavs);
        } else {
            const newFavs = currentFavs.filter((fav) => {
                return fav.id !== id;
            });
            saveToStorage("favourite-articles", newFavs);
        }
    }
}