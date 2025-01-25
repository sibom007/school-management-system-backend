import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { BookService } from "./book.service";

const GetBooks = catchAsync(async (req, res) => {
  const result = await BookService.GetBookIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

export const BookController = {
  GetBooks,
};
