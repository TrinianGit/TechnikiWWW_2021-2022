const { verify } = require("jsonwebtoken")

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if (!accessToken){
        return res.json("User not logged in")
    }
    try {
        const validToken = verify(accessToken, "lkdcb6dasnjk483y4n83y913")

        if (validToken){
            return next();
        }
    } 
    catch (err){
        return res.json("Error")
    }
}

module.exports = { validateToken }