import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { BookService } from "./chapter.service";

const AddChapter = catchAsync(async (req, res) => {
  const { token, ChapterData } = req.body;
  const result = await BookService.AddChapterIntoDB(token, ChapterData);
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
