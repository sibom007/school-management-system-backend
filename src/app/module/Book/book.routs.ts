import express from "express";
import { BookController } from "./book.contorler";

const router = express.Router();

router.get("/books", BookController.GetBooks);
router.get("/book", BookController.GetSingleBook);
router.post("/add-book", BookController.AddBooks);
router.patch("/update-book", BookController.UpdateBooks);

export const BookRoutes = router;
