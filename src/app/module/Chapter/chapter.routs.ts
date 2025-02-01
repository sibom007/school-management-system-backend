import express from "express";
import { ChapterController } from "./chapter.contorler";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/add-Chapter", auth(), ChapterController.AddChapters);
router.get("/get-Chapter", auth(), ChapterController.GetChapter);
router.get("/get-AllChapters", auth(), ChapterController.GetAllChapters);

export const ChapterRouts = router;
