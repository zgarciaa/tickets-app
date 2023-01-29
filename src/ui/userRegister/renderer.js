const username = document.querySelector("#username");
const password = document.querySelector("#password");
const form = document.querySelector("#form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    //Encrypt user data
    const userData = window.cryptography.encryptData({
        username: username.value,
        password: password.value
    }, decrypt = false);
    // Save user in database
});