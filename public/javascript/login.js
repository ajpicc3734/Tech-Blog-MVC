//const { response } = require("express");

async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#username-si").value.trim();
  const email = document.querySelector("#email-si").value.trim();
  const password = document.querySelector("#password-si").value.trim();

  if (username && email && password) {
    await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      console.log(response);
    });
  }
}

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
