import { baseUrl } from "./components/baseUrl.js";
import { formMessageContainer } from "./components/elements.js";
import { displayMessage } from "./utils/displayMessage.js";
import { noUsername, noPassword, badLoginDetails } from "./components/messages.js";
import { saveToken, saveUser } from "./utils/saveUser.js";
import { createLoginLink } from "./utils/dynamicLoginMenu.js";

const loginForm = document.querySelector(".login-form");
const loginButton = document.querySelector(".submitButton");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const formMessage = document.querySelector(".form-message");

createLoginLink();

loginForm.addEventListener("submit", e => {
  e.preventDefault();
  formMessage.innerHTML = "";
  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  if (usernameValue.length === 0) {
    return displayMessage("warning", noUsername, formMessageContainer);
  } else if (passwordValue.length === 0) {
    return displayMessage("warning", noPassword, formMessageContainer);
  }

  successfulLogin(usernameValue, passwordValue);
});

async function successfulLogin(username, password) {
  const loginUrl = baseUrl + "auth/local";
  const userData = JSON.stringify({ identifier: username, password: password });
  const options = {
    method: "POST",
    body: userData,
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    loginButton.innerHTML = "Logging in...";
    const response = await fetch(loginUrl, options);
    const json = await response.json();
    if (json.user) {
      saveToken(json.jwt);
      saveUser(json.user);
      location.href = "/";
    }
    if (json.error) {
      return displayMessage("warning", badLoginDetails, formMessageContainer);
    }
  } catch (error) {
    console.log(error);
    displayMessage("error", error, formMessageContainer);
  }
}