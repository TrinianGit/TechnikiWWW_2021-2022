const express = require("express");
const app = express();
const cors = require("cors");


const db = require('./models');

app.use(express.json());
app.use(cors());

//Routers
const loginRouter = require("./routes/Logins");
app.use("/logins", loginRouter);

const userRouter = require("./routes/Users");
app.use("/user", userRouter);

const messageRouter = require("./routes/Messages");
app.use("/messages", messageRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server aktywny na porcie 3001");
    });
});

