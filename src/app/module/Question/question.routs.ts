import express from "express";
import { QuestionController } from "./question.contorler";

const router = express.Router();

router.post("/add-question", QuestionController.AddQuestion);
router.patch(
  "/update-question-status",
  QuestionController.QuestionChangeStatus
);
router.delete("/delete-question", QuestionController.DeleteQuestion);


export const QuestionRoutes = router;
