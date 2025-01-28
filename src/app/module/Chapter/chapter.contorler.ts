import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { ChapterService } from "./chapter.service";

const GetChapter = catchAsync(async (req, res) => {
  const { token, chapterId } = req.body;
  const result = await ChapterService.GetChapterIntoDB(token, chapterId);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Get Chapter  successfully",
    data: result,
  });
});

export const ChapterController = {
  GetChapter,
};
