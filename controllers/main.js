// check username, password in post(login) request 
// if exist create new JWT
// send back to front-end 

// setup authentication so only the request with JWT can access the dashboard

const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')

const login = async (req,res) => {
    let {username,password} = req.body
    if(!username || !password){
        // throw new Error
        throw new CustomAPIError('Please provide email and password',400)
    }
    // Just for demo, normally provided by database.
    const id = new Date().getDate()

    // Try to keep payload small, better experience for user.
    // Only for demo. For Live projects, use long unguessable string value.
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'}) 

    res.status(200).json({msg:'user created',token})
    // console.log(username,password);
    // res.send('Fake Login/Register/Signup Route')
}

const dashboard = async (req,res) => {
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg:`Hello, Frog`,secret:`Here is your authorized data, your lucky number is ${luckyNumber}`})
}

module.exports = {
    login,dashboard 
}