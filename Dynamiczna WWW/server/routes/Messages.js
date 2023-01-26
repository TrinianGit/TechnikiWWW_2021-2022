const express = require("express");
const router = express.Router();
const { Messages } = require("../models")


router.get("/", async (req, res) => {
    const user = req.query.user;
    const Mess = await Messages.findAll({
        where: {To_User : user},
    })
    res.json(Mess)
});

router.post("/", async (req, res) => {
    const From = req.query.F;
    const To = req.query.T;
    const Message = req.query.M;

    await Messages.create({
        From_User: From,
        To_User: To,
        Message: Message,
    })
    res.json("OK")
});

module.exports = router;