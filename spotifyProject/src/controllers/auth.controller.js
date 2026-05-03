const userModel = require('../models/user.model');

const jwt = require("jsonwebtoken");

const bcrypt = require('bcrypt');


async function registerUser(req, res) {

    try {

        const { username, email, password, role = 'user' } = req.body;

        // basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const isUserAlreadyExist = await userModel.findOne({ 
            $or : [
                { username },
                { email }
            ]
        });

        if (isUserAlreadyExist) {
            return res.status(409).json({ 
                message : 'User with the same username or email already exists !' 
            });    
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hash,
            role
        });

        const token = jwt.sign(
            { 
                id: user._id,
                role: user.role 
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // set true in production (HTTPS)
            sameSite: "lax"
        });

        res.status(201).json({
            message : 'User registered successfully !',
            user :{
                id : user._id,
                username : user.username,
                email : user.email,
                role : user.role
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}


async function loginUser(req, res) {

    const{username , email , password} = req.body;


    const user = await userModel.findOne({
        $or : [
            { username },
            { email }
        ]
    });

    if(!user){
        return res.status(401).json({ message : 'Invalid username or email !'});
    }
const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(401).json({ message : 'Invalid password !'});
    }


    const token = jwt.sign(
        { id: user._id,
          role: user.role 
        }, 
        process.env.JWT_SECRET);
       
    res.cookie("token", token
    )
    res.status(200).json({
        message : 'User logged in successfully !',
        user :{
            id : user._id,
            username : user.username,
            email : user.email,
            role : user.role
        }
    });
      






}





module.exports = {
    registerUser,
    loginUser
};