const express = require('express');
const adminRouter = require('./admin');
const loginRouter = require('./login');

const app = express();

app.use(express.json())

const PORT = process.env.PORT || 3000;

app.use(loginRouter);
app.use(adminRouter);

app.get('/every', (req, res) => {
    res.json({
        message: "Everybody can see what I have in this route",
        type: "Unsecured route"
    })
});

app.listen(PORT, () => {
    console.log('Application listening on port '+PORT);
});

module.exports = app;
