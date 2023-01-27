const username = document.querySelector("#username");
const password = document.querySelector("#password");
const loginForm = document.querySelector("#loginForm");
const register = document.querySelector("#register");

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const user = window.cryptography.encrypt({
        username: username.value,
        password: password.value
    });
    const originalUser = window.cryptography.decrypt(user);
    console.log(user, originalUser);
});

register.addEventListener("click", () => {
    window.newWindow.userRegister();
});





