import express from "express";
import { QuestionController } from "./question.contorler";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/add-question", auth(), QuestionController.AddQuestion);
router.get("/get-question", auth(), QuestionController.GetQuestion);
router.get("/get-user-question", auth(), QuestionController.GetUserQuestion);
router.get(
  "/get-panding-question",
  auth(),
  QuestionController.GetPandingQuestion
);
router.patch(
  "/update-question-status",
  auth(),
  QuestionController.QuestionChangeStatus
);
router.delete("/delete-question", QuestionController.DeleteQuestion);


export const QuestionRoutes = router;
