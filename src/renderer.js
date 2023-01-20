const info = document.getElementById("info");
info.innerText = `This app is using Node v${versions.node()}, Chrome v${versions.chrome()} and Electron v${versions.electron()}`;