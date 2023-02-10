document.addEventListener("DOMContentLoaded", () => {
    const { ipcRenderer } = window.require("electron");
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
    const formOperatorRegister = document.querySelector("#form");

    formOperatorRegister.addEventListener("submit", (event) => {
        event.preventDefault();
        const operator = {
            username: username.value,
            password: password.value
        };

        // Send data to main
        ipcRenderer.send("new-operator", operator);
    });
});



