import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { QuestionService } from "./question.service";

const AddQuestion = catchAsync(async (req, res) => {
  const { token, QuestionData } = req.body;
  const result = await QuestionService.AddQuestionIntoDB(token, QuestionData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Question Add successfully",
    data: result,
  });
});

const QuestionChangeStatus = catchAsync(async (req, res) => {
  const { token, QuestionData } = req.body;
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
  const { token, id } = req.body;
  const result = await QuestionService.AddQuestionIntoDB(token, id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Question Delete successfully",
    data: result,
  });
});

export const QuestionController = {
  AddQuestion,
  DeleteQuestion,
  QuestionChangeStatus,
};
