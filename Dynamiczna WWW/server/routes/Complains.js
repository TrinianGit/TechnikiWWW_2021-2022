const express = require("express");
const router = express.Router();
const { Complains } = require("../models")


router.post("/", async (req, res) => {
    const Name = req.query.N + req.query.S
    const Email = req.query.E
    const Message = req.query.M

    await Complains.create({
        Name: Name,
        Email: Email,
        Message: Message,
    });
    
});

module.exports = router;