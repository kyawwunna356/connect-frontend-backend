const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const User = require('../models/User');


// register
const register = async (req,res) => {
  console.log(req.body)
  const fileName = req.fileName
   try {
        const {
            firstName,
            lastName,
            email,
            password,
            location,
            occupation,
        }               = req.body
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: passwordHash,
            location,
            occupation,
            imagePath: fileName,
            impressions: Math.floor(Math.random() * 1000),
            viewedProfile: Math.floor(Math.random() * 1000)
        })
        const token = await jwt.sign({id: user._id},process.env.SECRET_KEY,{expiresIn: '3d'})
        delete user.password
        return res.status(200).json({token,user})
   } 
   catch (error) {
        console.log(error)
        return res.status(400).json(error)
   }

}

const login = async (req,res) => {
   try {
   
        const {email,password} = req.body
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "User not found"})

        const match = await bcrypt.compare(password,user.password)
        if(!match) return res.status(400).json({message: "credentials do not match"})

        const token = await jwt.sign({id: user._id},process.env.SECRET_KEY,{expiresIn: '3d'})
     //    user.friends.push('6392dbc2dee88e36feefa115')
     //    await user.save()
        
        delete user.password
        return res.status(200).json({token,user})
   } catch (error) {
        return res.status(500).json(error)
   }

}

module.exports = {register,login}