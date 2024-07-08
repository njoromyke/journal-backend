import express from "express";
import { createJournal, getJournalById, getMyJournals, updateJournal } from "../controllers/journal.controller";
import protect from "../middlewares/auth.middleware";
import { createJournalValidator } from "../validations/journal.validation";

const router = express.Router();

router.route("/").post(protect, createJournalValidator, createJournal).get(protect, getMyJournals);

router.route("/:id").get(protect, getJournalById).put(protect, updateJournal);

module.exports = router;
