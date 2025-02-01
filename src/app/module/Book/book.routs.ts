import express from "express";
import { BookController } from "./book.contorler";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/books", auth(), BookController.GetBooks);
router.get("/book", auth(), BookController.GetSingleBook);
router.post("/add-book", auth(), BookController.AddBooks);
router.patch("/update-book", auth(), BookController.UpdateBooks);

export const BookRoutes = router;
