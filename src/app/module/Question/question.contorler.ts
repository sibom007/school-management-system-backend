import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { QuestionService } from "./question.service";

const AddQuestion = catchAsync(async (req, res) => {
  const result = await QuestionService.AddAuestionIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

export const QuestionController = {
  AddQuestion,
};
