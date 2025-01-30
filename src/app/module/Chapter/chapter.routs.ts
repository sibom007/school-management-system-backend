import express from "express";
import { ChapterController } from "./chapter.contorler";

const router = express.Router();

router.post("/add-Chapter", ChapterController.AddChapters);
router.get("/get-Chapter", ChapterController.GetChapter);
router.get("/get-AllChapters", ChapterController.GetAllChapters);

export const ChapterRouts = router;
