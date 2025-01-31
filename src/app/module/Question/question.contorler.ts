import catchAsync from "../../../utils/catchAsync";
import { getAuthToken } from "../../../utils/getAuthToken";
import sendResponse from "../../../utils/sendResponse";
import { QuestionService } from "./question.service";

const AddQuestion = catchAsync(async (req, res) => {
  const token = getAuthToken(req);
  const result = await QuestionService.AddQuestionIntoDB(token, req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Question Add successfully",
    data: result,
  });
});
const GetQuestion = catchAsync(async (req, res) => {
  const chapterId = req.query.chapterId as string;
  const token = getAuthToken(req);
  const result = await QuestionService.GetQuestionIntoDB(token, chapterId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Questions retrieved successfully",
    data: result,
  });
});
const QuestionChangeStatus = catchAsync(async (req, res) => {
  const { QuestionData } = req.body;
  const token = getAuthToken(req);
  const result = await QuestionService.QuestionChangeStatusIntoDB(
    token,
    QuestionData
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Question status Changed successfully",
    data: result,
  });
});

const DeleteQuestion = catchAsync(async (req, res) => {
  const { id } = req.body;
  const token = getAuthToken(req);
  const result = await QuestionService.DeleteQuestionIntoDB(token, id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Question Delete successfully",
    data: result,
  });
});

export const QuestionController = {
  AddQuestion,
  GetQuestion,
  DeleteQuestion,
  QuestionChangeStatus,
};
