const username = document.querySelector("#username");
const password = document.querySelector("#password");
const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const userSaved = window.cryptography.encrypt({
        username: username.value,
        password: password.value
    });
    const originalUser = window.cryptography.decrypt(userSaved);
    console.log(userSaved, originalUser);
});





