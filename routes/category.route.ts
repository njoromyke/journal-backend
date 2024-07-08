import express from "express";
import { createCategory, getCategories, getCategoryById, updateCategory } from "../controllers/category.controller";
import protect from "../middlewares/auth.middleware";
import { createCategoryValidator, updateCategoryValidator } from "../validations/category.validation";

const router = express.Router();

router.route("/").post(protect, createCategoryValidator, createCategory).get(protect, getCategories);

router.route("/:id").get(protect, getCategoryById).put(protect, updateCategoryValidator, updateCategory);

module.exports = router;
