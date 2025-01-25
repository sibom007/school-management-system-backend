import express from "express";
import { BookController } from "./book.contorler";

const router = express.Router();

router.post("/books", BookController.GetBooks);
export const BookRoutes = router;
