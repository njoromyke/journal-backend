import { createUser, getUserById, loginUser, updateProfile } from "../controllers/user.controller";
import { createUserValidator, loginUserValidator, updateProfileValidator } from "../validations/user.validation";

const express = require("express");
const router = express.Router();

router.route("/").post(createUserValidator, createUser);

router.route("/login").post(loginUserValidator, loginUser);

router.route("/user/:id").get(getUserById).put(updateProfileValidator, updateProfile);

module.exports = router;
