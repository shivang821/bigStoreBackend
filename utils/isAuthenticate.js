const jwt = require('jsonwebtoken')
const User = require("../models/userModel")
exports.isAuthenticate = async(req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(400).json({ error: "please login to access this page" })
        }
        const decodedData = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decodedData.id);
        if (!user) return res.status(400).json({ error: "please login to access this page" })
        req.user = user;
        next()
    } catch (error) {
        res.status(400).json({ error: "somthing went wrong" })
    }
}
exports.isAuthorize=async(req, res, next)=>{
    try {
        if(req.user.role==='seller'){
            return next()
        }else{
            return res.status(400).json({error:"you don't have access to this route"})
        }
    } catch (error) {
        res.status(400).json({ error: "somthing went wrong" })
    }
}