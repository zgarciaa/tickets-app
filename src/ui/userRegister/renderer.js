const username = document.querySelector("#username");
const password = document.querySelector("#password");
const userRegForm = document.querySelector("#userRegForm");

userRegForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log({
        username: username.value,
        password: password.value
    });
});