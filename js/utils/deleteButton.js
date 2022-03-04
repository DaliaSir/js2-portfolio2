import { baseUrl } from "../components/baseUrl.js";
import { getToken } from "./saveUser.js";
import { displayMessage } from "./displayMessage.js";
import { formMessageContainer } from "../components/elements.js";

export default function deleteButton(id) {
  const deleteBtn = document.querySelector(".deleteButton");

  deleteBtn.onclick = async () => {
    const deleteArticle = confirm("Delete this article?");

    if (deleteArticle) {
      const url = baseUrl + "articles/" + id;
      const token = getToken();
      const options = {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        },
      };
      try {
        const response = await fetch(url, options);
        const json = await response.json();
        location.href = "/edit-articles.html";

      } catch (error) {
        console.log(error);
        displayMessage("error", error, formMessageContainer);
        window.scrollTo(top);
      }
    }
  }
}