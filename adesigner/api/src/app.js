const express = require("express");
const config = require("./config");
const loaders = require("./loaders");
const {UserRoutes} = require("./routes");

const { ipcRenderer } = require("electron");
const contactList = document.querySelector("#contactList");

config();
loaders();


const app = express();

app.use(express.json());

app.listen(process.env.APP_PORT, () => {
    console.log("App is working..")
    app.use("/users", UserRoutes);
})

