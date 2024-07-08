import express from "express";
import { createJournal, getJournals, getJournalById, deleteJournal, updateJournal } from "../controllers/journal.controller";
import protect from "../middlewares/auth.middleware";
import { createJournalValidator, updateJournalValidator } from "../controllers/validations/journal.validation";

const router = express.Router();

router.route("/").post(protect, createJournalValidator, createJournal).get(protect, getJournals);

router
  .route("/:id")
  .get(protect, getJournalById)
  .put(protect, updateJournalValidator, updateJournal)
  .delete(protect, deleteJournal);

module.exports = router;
