const username = document.querySelector("#username");
const password = document.querySelector("#password");
const form = document.querySelector("#form");
const btnRegister = document.querySelector("#btnRegister");

form.addEventListener("submit", (event) => {
    event.preventDefault();
});

btnRegister.addEventListener("click", () => {
    window.newWindow.userRegister();
});





