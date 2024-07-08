import { Request, Response } from "express";
import { prisma } from "../config/db/database";
import { generateToken } from "../utils/jwt.util";
import statusCodes from "../utils/status-codes.util";
import asyncHandler from "express-async-handler";
import { comparePassword } from "../utils/user.util";

const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    res.status(statusCodes.BAD_REQUEST).json({
      message: "User already exists",
    });

    return;
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  res.status(statusCodes.CREATED).json({
    message: "User created successfully",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    },
  });
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    res.status(statusCodes.NOT_FOUND).json({
      message: "User not found",
    });

    return;
  }

  const isMatch = await comparePassword(email, password);

  if (!isMatch) {
    res.status(statusCodes.UNAUTHORIZED).json({
      message: "Invalid email or password",
    });

    return;
  }

  res.status(statusCodes.OK).json({
    message: "User logged in successfully",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    },
  });
});

const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    res.status(statusCodes.NOT_FOUND).json({
      message: "User not found",
    });

    return;
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      name,
      email,
      password,
    },
  });

  res.status(statusCodes.OK).json({
    message: "User updated successfully",
    user: {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(updatedUser.id),
    },
  });
});

const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    res.status(statusCodes.NOT_FOUND).json({
      message: "User not found",
    });

    return;
  }

  res.status(statusCodes.OK).json({
    message: "User found successfully",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

export { createUser, loginUser, updateProfile, getUserById };
