import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { BookService } from "./chapter.service";

const AddChapter = catchAsync(async (req, res) => {
  const result = await BookService.AddChapterIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

export const ChapterController = {
  AddChapter,
};
