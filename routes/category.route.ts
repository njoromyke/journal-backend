import express from "express";
import { createCategory, getCategories, getCategoryById, updateCategory } from "../controllers/category.controller";
import protect from "../middlewares/auth.middleware";

const router = express.Router();

router.route("/").post(protect, createCategory).get(protect, getCategories);
router.route("/:id").get(protect, getCategoryById).put(protect, updateCategory);

module.exports = router;
