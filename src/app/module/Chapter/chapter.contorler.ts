import catchAsync from "../../../utils/catchAsync";
import { getAuthToken } from "../../../utils/getAuthToken";
import sendResponse from "../../../utils/sendResponse";
import { ChapterService } from "./chapter.service";

const GetChapter = catchAsync(async (req, res) => {
  const token = getAuthToken(req);
  const chapterId = req.query.chapterId as string;
  const result = await ChapterService.GetChapterIntoDB(token, chapterId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get Chapter  successfully",
    data: result,
  });
});
const GetAllChapters = catchAsync(async (req, res) => {
  const token = getAuthToken(req);
  const result = await ChapterService.GetAllChapterIntoDB(token);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get Chapter  successfully",
    data: result,
  });
});

const AddChapters = catchAsync(async (req, res) => {
  const token = getAuthToken(req);
  const result = await ChapterService.AddChapterIntoDB(token, req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Add Chapter  successfully",
    data: result,
  });
});

export const ChapterController = {
  GetChapter,
  GetAllChapters,
  AddChapters,
};
