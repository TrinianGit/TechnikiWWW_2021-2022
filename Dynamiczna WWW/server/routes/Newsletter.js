const express = require("express");
const router = express.Router();
const { Newsletter } = require("../models")

router.post("/", async (req, res) => {
    const Email = req.query.E;
    const [u, created] = await Newsletter.findOrCreate(
        {
            where: {Email : Email},
            defaults: {
                Email: Email,
            }
        }
    );
    if (created){
        res.json("Added to Newsletter");
    }
    else{
        res.json("Already in Newsletter");
    }
});

module.exports = router;