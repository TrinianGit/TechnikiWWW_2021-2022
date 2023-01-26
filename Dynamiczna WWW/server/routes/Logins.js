const express = require("express");
const router = express.Router();
const { Logins } = require("../models");
const { sign } = require("jsonwebtoken")


router.get("/", async (req, res) => {
    const Login = req.query.Login
    const Password = req.query.Password
    const user = await Logins.findOne(
        {
        where: {Login : Login}
        }
    )
    if (user === null) {
        res.json("Not found Login");
    }
    else if (user["Password"] !== Password){
        res.json("Wrong Password");
    } 
    else{
        const accesstoken = sign({Login: user["Login"]}, "lkdcb6dasnjk483y4n83y913")
        res.json(accesstoken);
    }
});

router.post("/", async (req, res) => {

    const Login = req.query.Login;
    const Password = req.query.Password;
    const Flag = req.query.Flag;

    if (Flag === "Update"){
        await Logins.update(
            {Password : Password},
            {where : { Login : Login}} 
        );
        res.json("Password changed");
    }
    else{
        const [u, created] = await Logins.findOrCreate(
            {
                where: {Login : Login},
                defaults: {
                    Login: Login,
                    Password: Password
                }
            }
        );
        if (created){
            res.json("User created");
        }
        else{
            res.json("User with this name already exists");
        }
    }
});

module.exports = router;