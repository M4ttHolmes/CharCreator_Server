const Express = require('express');
const app = Express();
require("dotenv").config();
const dbConnection = require("./db");

app.use(require("./middleware/headers"));
app.use(Express.json());


const controllers = require("./controllers");

app.use("/character", controllers.characterController);
app.use("/user", controllers.userController);

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(3000, () => {
            console.log(`[Server]: App is listening on ${process.env.PORT}.`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    });