const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const loginRouter = express.Router();

const SECRET = process.env.SECRET

loginRouter.post('/login', (req, res) => {
    const {username, password} = req.body;

    if (username === 'admin' && password === 'admin') {
        const adminPayload = {
            id: Math.floor(Math.random() *10000),
            username,
            role: "user"
        }

        const signed = jwt.sign(JSON.stringify(adminPayload), SECRET);
        return res.json({
            mesage: 'Login successful',
            data: {
                token: signed
            }
        })
    } else {
        res.status(400).json({
            message: 'Invalid username or password'
        })
    }
});

module.exports = loginRouter;
