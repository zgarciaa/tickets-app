const { ipcRenderer } = window.require("electron");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const form = document.querySelector("#form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const worker = {
        username: username.value,
        password: password.value
    };

    // Send data to main
    ipcRenderer.send("new-worker", worker);
});



