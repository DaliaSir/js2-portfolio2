import { getUsername } from "./saveUser.js";
import { logout } from "./logoutButton.js";

export function createLoginLink() {
  const loginLinkContainer = document.querySelector(".loginLink");
  const { pathname } = document.location;
  const username = getUsername();

  let loginLink = `<a class="nav-link  ${pathname === "/login.html" ? "active" : ""}" href="login.html">Login</a>`;

  if (username) {
    const isActive = pathname === "/add.html" || pathname === "/edit.html";

    loginLink = ` <a class="nav-link admin-nav-link ${isActive ? "active" : ""}" href="admin.html" >Welcome <br />${username}</a>
					        <button id="logout" type="button" class="btn nav-link text-uppercase">Logout</button>
		`;
  }
  loginLinkContainer.innerHTML = `${loginLink}`;
  logout();
}