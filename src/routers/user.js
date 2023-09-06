const express = require('express')
const User = require('../models/user')
const Auth = require('../middleware/auth')

const router = new express.Router()


router.post('/users', async (req, res) => {         //signup
    const user = new User(req.body)

    console.log(user)
    console.log("success")

    try {
        await user.save()
        const token = await user.generateAuthToken()
        
        res.status(201).send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }

})


router.post('/users/login', async (req, res) => {                   //login
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token})
        console.log(user)
    } catch (error) {
        res.status(400).send(error)
    }
})


router.post('/users/logout', Auth, async (req, res) => {            //logout
   
    try {
       req.user.tokens =  req.user.tokens.filter((token) => {
            return token.token !== req.token 
        })

        await req.user.save()
        res.status(200).send(req.user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


router.post('/users/logoutAll', Auth, async(req, res) => {          //Logout All 
    try {
        req.user.tokens = []
        await req.user.save()
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error.message)        
    }
})
module.exports = router