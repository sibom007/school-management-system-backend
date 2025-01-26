import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { BookService } from "./book.service";

const GetBooks = catchAsync(async (req, res) => {
  const result = await BookService.GetBookIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Book Get successfully",
    data: result,
  });
});
const AddBooks = catchAsync(async (req, res) => {
  const { token, BookData } = req.body;
  const result = await BookService.AddBookIntoDB(token, BookData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Book Add successfully",
    data: result,
  });
});

const UpdateBooks = catchAsync(async (req, res) => {
  const { token, BookData } = req.body;
  const result = await BookService.UpdateBookIntoDB(token, BookData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Book Update successfully",
    data: result,
  });
});

export const BookController = {
  GetBooks,
  AddBooks,
  UpdateBooks,
};
