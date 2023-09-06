const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token':token })
        //console.log("token= ", token)
        const tokenExpiration = decoded.exp;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        //console.log('Decoded Token:', decoded);

        if(!user) {
            throw new Error
        }
        req.token = token
        req.user = user
        //console.log("req.user :", req.user)
        next()
    } catch (error) {
        res.status(401).send({ error: error.message });
    }
}

module.exports = auth