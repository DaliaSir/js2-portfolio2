import { getUsername } from "./saveUser.js";
import { logout } from "./logoutButton.js";

export function createLoginLink() {
    const loginLinkContainer = document.querySelector(".loginLink");

    const { pathname } = document.location;
    //console.log(pathname);

    const username = getUsername();

    let loginLink = `<a class="nav-link  ${pathname === "/login.html" ? "active" : ""}" href="login.html">Login</a>`;

    if (username) {
        loginLink = ` <span class="nav-link ">Welcome <br />
                      ${username}</span>
                      <button id="logout" type="button" class="btn nav-link text-uppercase">Logout</button>
                      <a class="nav-link  ${pathname === "/add.html" ? "active" : ""}" href="add.html">Add Article</a>
                      `;
    }

    loginLinkContainer.innerHTML = `${loginLink}`;

    logout();
}