document.addEventListener("DOMContentLoaded", () => {
    const { ipcRenderer } = window.require("electron");
    const _name = document.querySelector("#_name");
    const lastName = document.querySelector("#lastName");
    const _document = document.querySelector("#_document");
    const fingerprint = document.querySelector("#fingerprint");
    const role = document.querySelector("#role");
    const formUserRegister = document.querySelector("#formUserRegister");

    const roles = {
        "Expositor": 1,
        "General": 2,
        "Cortesia": 3
    };

    const getRoleId = (role) => {
        return roles[role]
    };

    formUserRegister.addEventListener("submit", (event) => {
        event.preventDefault();
        const roleId = getRoleId(role.value);
        const user = {
            name: _name.value,
            lastName: lastName.value,
            document: _document.value,
            roleId: roleId
        };

        // Send data to main
        ipcRenderer.send("new-user", user);
    });
});