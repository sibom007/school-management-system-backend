import express from "express";
import { ChapterController } from "./chapter.contorler";

const router = express.Router();

router.get("/get-Chapter", ChapterController.GetChapter);

export const ChapterRouts = router;
