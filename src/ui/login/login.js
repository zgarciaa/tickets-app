const { ipcRenderer } = window.require("electron");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const form = document.querySelector("#form");
const btnRegisterOperator = document.querySelector("#btnRegisterOperator");
const btnRegisterUser = document.querySelector("#btnRegisterUser");
const btnNewSale = document.querySelector("#btnNewSale");

form.addEventListener("submit", (event) => {
    event.preventDefault();
});

btnRegisterOperator.addEventListener("click", () => {
    ipcRenderer.send("new-window", "src/ui/register/operatorRegister.html");
});

btnRegisterUser.addEventListener("click", () => {
    ipcRenderer.send("new-window", "src/ui/register/userRegister.html")
});

btnNewSale.addEventListener("click", () => {
    ipcRenderer.send("new-window", "src/ui/sales/newSale.html")
});





