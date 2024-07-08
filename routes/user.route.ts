const express = require("express");
const router = express.Router();
const { loginUser, createUser, updateProfile, getUserById } = require("../controllers/user.controller");

router.route("/").post(createUser);
router.route("/login").post(loginUser);

router.route("/user/:id").post(loginUser).get(getUserById).put(updateProfile);

module.exports = router;
