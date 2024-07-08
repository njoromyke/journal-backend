import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { User } from "../types/user";
import { prisma } from "../config/db/database";
import statusCodes from "../utils/status-codes.util";
import { dateFilter } from "../utils/date.util";
import { Prisma } from "@prisma/client";

interface CustomRequest extends Request {
  user?: User;
}

const createJournal = asyncHandler(async (req: CustomRequest, res: Response) => {
  const { title, content, categoryId, date } = req.body;

  const journalExists = await prisma.journal.findFirst({
    where: {
      title,
      userId: req.user?.id,
    },
  });

  if (journalExists) {
    console.log(journalExists);
    res.status(statusCodes.BAD_REQUEST).json({
      message: "Journal already exists",
    });

    return;
  }

  const journal = await prisma.journal.create({
    data: {
      title,
      content,
      date,
      category: {
        connect: {
          id: categoryId,
        },
      },
      user: {
        connect: {
          id: req.user?.id,
        },
      },
    },
  });

  res.status(statusCodes.CREATED).json(journal);
});

const getMyJournals = asyncHandler(async (req: CustomRequest, res: Response) => {
  const { date, filterText, categoryId } = req.query;

  let where: Prisma.JournalWhereInput = {
    userId: req.user?.id,
  };

  if (date) {
    const dateData = dateFilter(date as string);
    where.createdAt = {
      gte: dateData.startDate,
      lte: dateData.endDate,
    };
  }

  if (filterText) {
    where.title = {
      contains: filterText as string,
    };
  }

  if (categoryId) {
    where.categoryId = parseInt(categoryId as string);
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

const updateJournal = asyncHandler(async (req: CustomRequest, res: Response) => {
  const { id } = req.params;

  const { title, content, categoryId, date } = req.body;

  const existsJournal = await prisma.journal.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!existsJournal) {
    res.status(statusCodes.NOT_FOUND).json({
      message: "Journal not found",
    });

    return;
  }

  const journal = await prisma.journal.update({
    where: { id: Number(id) },
    data: {
      title: title || existsJournal.title,
      content: content || existsJournal.content,
      date: date || existsJournal.date,
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
  });

  res.status(statusCodes.OK).json(journal);
});

const getJournalById = asyncHandler(async (req: CustomRequest, res: Response) => {
  const { id } = req.params;

  const journal = await prisma.journal.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  if (!journal) {
    res.status(statusCodes.NOT_FOUND).json({
      message: "Journal not found",
    });

    return;
  }

  res.status(statusCodes.OK).json(journal);
});

export { createJournal, getJournalById, getMyJournals, updateJournal };
