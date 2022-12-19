const express = require('express');
const { registerUser,loginUser,listAllUsers,listOneUser } = require("../controllers/Users");
const validate = require("../middlewares/validation")
const { createUser } = require("../validations/User")

const router = express.Router();


router.route('/register').post(validate(createUser, "body"), registerUser);
router.route('/login').post(loginUser);

router.route('/').get(listAllUsers);
router.route('/:id').get(listOneUser);

module.exports = router;

