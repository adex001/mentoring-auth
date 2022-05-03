const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { json } = require('express/lib/response');

dotenv.config();

const SECRET = process.env.SECRET;

const adminRouter = express.Router();

adminRouter.post('/admin', async (req, res) => {
    const {authorization } = req.headers;
    if (!authorization) {
        return res.status(400).json({
            message: 'No authorization token found'
        })
    }
    let payload = await jwt.verify(authorization, SECRET);
    console.log(payload);
    if (!payload) {
        return res.status(401).json({
            message: 'You are not authorized'
        });
    }
    // payload = JSON.parse(payload);
    if (payload.role !== "admin") {
        return res.status(401).json({
            message: 'You are not authorized'
        });
    }

    return res.status(200).json({
        message: 'Welcome Admin',
        data: payload
    })

});

module.exports = adminRouter;
