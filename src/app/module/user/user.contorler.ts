import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { userservise } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await userservise.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});
const GetUserById = catchAsync(async (req, res) => {
  const result = await userservise.GetUserById(req.user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User get successfully",
    data: result,
  });
});

export const UserControllers = {
  createUser,
  GetUserById,
};
