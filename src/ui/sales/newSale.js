document.addEventListener("DOMContentLoaded", () => {
    const { ipcRenderer } = window.require("electron");
    const clientName = document.querySelector("#clientName");
    const clientLastName = document.querySelector("#clientLastName");
    const price = document.querySelector("#price");
    const stand = document.querySelector("#stand");
    const formNewSale = document.querySelector("#formNewSale");

    const stands = {
        "No": 0,
        "Stand1": 1,
        "Stand2": 2,
        "Stand3": 3,
        "Stand4": 4,
    };

    const getStandId = (stand) => {
        return stands[stand] === 0 ? null : stands[stand];
    };

    formNewSale.addEventListener("submit", (event) => {
        event.preventDefault();
        const standId = getStandId(stand.value);
        const sale = {
            clientName: clientName.value,
            clientLastName: clientLastName.value,
            price: price.value,
            standId: standId
        };

        ipcRenderer.send("new-sale", sale);
    });
});
