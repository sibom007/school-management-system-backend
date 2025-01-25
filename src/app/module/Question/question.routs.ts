import express from "express";
import { QuestionController } from "./question.contorler";

const router = express.Router();

router.post("/AddChapter", QuestionController.AddQuestion);

export const QuestionRoutes = router;
