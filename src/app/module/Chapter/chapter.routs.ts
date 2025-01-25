import express from "express";
import { ChapterController } from "./chapter.contorler";

const router = express.Router();

router.post("/AddChapter", ChapterController.AddChapter);

export const ChapterRouts = router;
