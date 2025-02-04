import { QuestionStatus } from "@prisma/client";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { QuestionService } from "./question.service";

const AddQuestion = catchAsync(async (req, res) => {
  const result = await QuestionService.AddQuestionIntoDB(req.user, req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Question Add successfully",
    data: result,
  });
});

const GetQuestion = catchAsync(async (req, res) => {
  const chapterId = req.query.chapterId as string;
  const result = await QuestionService.GetQuestionIntoDB(chapterId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Questions retrieved successfully",
    data: result,
  });
});

const GetUserQuestion = catchAsync(async (req, res) => {
  const { status } = req.query;
  const result = await QuestionService.GetUserQuestionIntoDB(
    req.user,
    status as QuestionStatus
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Questions retrieved successfully",
    data: result,
  });
});

const GetPandingQuestion = catchAsync(async (req, res) => {
  const result = await QuestionService.GetPandingQuestionIntoDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Questions retrieved successfully",
    data: result,
  });
});

const QuestionChangeStatus = catchAsync(async (req, res) => {
  const QuestionData = req.body;
  const result = await QuestionService.QuestionChangeStatusIntoDB(
    req.user,
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
  const { id } = req.query;
  const result = await QuestionService.DeleteQuestionIntoDB(id as string);
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
  GetUserQuestion,
  GetPandingQuestion,
  DeleteQuestion,
  QuestionChangeStatus,
};
