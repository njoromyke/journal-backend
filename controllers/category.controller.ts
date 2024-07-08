import { Request, Response } from "express";
import statusCodes from "../utils/status-codes.util";
import asyncHandler from "express-async-handler";
import { prisma } from "../config/db/database";

const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;

  const categoryExists = await prisma.category.findUnique({
    where: { name },
  });

  if (categoryExists) {
    res.status(statusCodes.BAD_REQUEST).json({
      message: "Category already exists",
    });

    return;
  }

  const category = await prisma.category.create({
    data: {
      name,
    },
  });

  res.status(statusCodes.CREATED).json({
    message: "Category created successfully",
    category: {
      id: category.id,
      name: category.name,
    },
  });
});

const getCategories = asyncHandler(async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();

  res.status(statusCodes.OK).json({
    message: "Categories fetched successfully",
    categories,
  });
});
const getCategoryById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = await prisma.category.findUnique({
    where: { id: Number(id) },
  });

  if (!category) {
    res.status(statusCodes.NOT_FOUND).json({
      message: "Category not found",
    });

    return;
  }

  res.status(statusCodes.OK).json({
    message: "Category fetched successfully",
    category,
  });
});

const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await prisma.category.findUnique({
    where: { id: Number(id) },
  });

  if (!category) {
    res.status(statusCodes.NOT_FOUND).json({
      message: "Category not found",
    });

    return;
  }

  const updatedCategory = await prisma.category.update({
    where: { id: Number(id) },
    data: {
      name,
    },
  });

  res.status(statusCodes.OK).json({
    message: "Category updated successfully",
    category: updatedCategory,
  });
});

export { createCategory, getCategories, getCategoryById, updateCategory };
