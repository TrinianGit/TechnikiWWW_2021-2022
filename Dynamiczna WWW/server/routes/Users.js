const express = require("express");
const router = express.Router();
const { Users } = require("../models")


router.get("/", async (req, res) => {
    const Login = req.query.L;

    const userinfo = await Users.findOne({
        where : {Login: Login}
    })
    if (userinfo === null){
        res.json("Not found")
    }
    else{
        res.json(userinfo);
    }
});

router.post("/", async (req, res) => {
    const Login = req.query.U;
    const Name = req.query.N;
    const Email = req.query.E;
    const Number = req.query.NB;
    const Adress = req.query.A;
    const WebPage = req.query.W;
    const Github = req.query.G;
    const Twitter = req.query.T;
    const Instagram = req.query.I;
    const Facebook = req.query.F;
    const Flag = req.query.FLAG;
    if (Flag === 'create'){
        await Users.create({
            Login: Login,
            Email: Email
        })
        res.json("OK")
    }
    else if (Flag === 'update'){
        await Users.update(
            {
                Name: Name,
                Email: Email,
                Number: Number,
                Adress: Adress,
                Webpage: WebPage,
                Github: Github,
                Twitter: Twitter,
                Instagram: Instagram,
                Facebook: Facebook
            },
            {where: {Login : Login}}

        )
        res.json("OK")
    }
    res.json("NO")
});

module.exports = router;