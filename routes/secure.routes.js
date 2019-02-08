const express = require('express');
const actions = require("../controllers/user.controller")
const router = express.Router();

//Lets say the route below is very sensitive and we want only authorized users to have access

//Displays information tailored according to the logged in user
router.get('/profile', actions.getUser);
router.put("/profile", actions.putUser);

module.exports = router;
