import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { BookService } from "./book.service";

const GetBooks = catchAsync(async (req, res) => {
  const result = await BookService.GetBookIntoDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Book Get successfully",
    data: result,
  });
});

const GetSingleBook = catchAsync(async (req, res) => {
  const { bookId } = req.query;
  const result = await BookService.GetSingleBookIntoDB(bookId as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Book Get successfully",
    data: result,
  });
});
const AddBooks = catchAsync(async (req, res) => {
  const { BookData } = req.body;
  const result = await BookService.AddBookIntoDB(req.user, BookData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Book Add successfully",
    data: result,
  });
});

const UpdateBooks = catchAsync(async (req, res) => {
  const { BookData } = req.body;
  const result = await BookService.UpdateBookIntoDB(req.user, BookData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Book Update successfully",
    data: result,
  });
});

export const BookController = {
  GetBooks,
  GetSingleBook,
  AddBooks,
  UpdateBooks,
};
