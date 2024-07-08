import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import asyncHandler from "express-async-handler";
import { prisma } from "../config/db/database";
import statusCodes from "../utils/status-codes.util";
import { dateFilter } from "../utils/date.util";

const createJournal = asyncHandler(async (req: Request, res: Response) => {
  const { title, content, categoryId } = req.body;

  const journalExists = await prisma.journal.findUnique({
    where: { title },
  });

  if (journalExists) {
    res.status(statusCodes.BAD_REQUEST).json({
      message: "Journal already exists",
    });

    return;
  }

  const journal = await prisma.journal.create({
    data: {
      title,
      content,
      categoryId,
    },
  });

  res.status(statusCodes.CREATED).json({
    message: "Journal created successfully",
    journal: {
      id: journal.id,
      title: journal.title,
      content: journal.content,
      categoryId: journal.categoryId,
    },
  });
});

const getJournals = asyncHandler(async (req: Request, res: Response) => {
  const { categoryId, search, date } = req.query;

  let where: Prisma.Journal_EntryWhereInput = {};

  if (categoryId) {
    where.categoryId = Number(categoryId);
  }

  if (search) {
    where.title = {
      contains: String(search),
    };
  }

  if (dateFilter) {
    const filter = dateFilter(date as string);
    where.createdAt = {
      gte: filter.startDate,
      lte: filter.endDate,
    };
  }

  const journals = await prisma.journal.findMany({
    where,
    include: {
      category: true,
    },
  });

  res.status(statusCodes.OK).json({
    message: "Journals fetched successfully",
    journals,
  });
});

const getJournalById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const journal = await prisma.journal.findUnique({
    where: { id: Number(id) },
    include: {
      category: true,
    },
  });

  if (!journal) {
    res.status(statusCodes.NOT_FOUND).json({
      message: "Journal not found",
    });

    return;
  }

  res.status(statusCodes.OK).json({
    message: "Journal fetched successfully",
    journal,
  });
});

const updateJournal = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, categoryId } = req.body;

  const journal = await prisma.journal.findUnique({
    where: { id: Number(id) },
  });

  if (!journal) {
    res.status(statusCodes.NOT_FOUND).json({
      message: "Journal not found",
    });

    return;
  }

  const updatedJournal = await prisma.journal.update({
    where: { id: Number(id) },
    data: {
      title: title || journal.title,
      content: content || journal.content,
      categoryId: categoryId || journal.categoryId,
    },
  });

  res.status(statusCodes.OK).json({
    message: "Journal updated successfully",
    journal: updatedJournal,
  });
});

const deleteJournal = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const journal = await prisma.journal.findUnique({
    where: { id: Number(id) },
  });

  if (!journal) {
    res.status(statusCodes.NOT_FOUND).json({
      message: "Journal not found",
    });

    return;
  }

  await prisma.journal.delete({
    where: { id: Number(id) },
  });

  res.status(statusCodes.OK).json({
    message: "Journal deleted successfully",
  });
});

export { createJournal, getJournals, getJournalById, updateJournal, deleteJournal };
