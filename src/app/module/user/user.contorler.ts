import catchAsync from '../../../utils/catchAsync';
import pick from '../../../utils/pick';
import sendResponse from '../../../utils/sendResponse';
import { userFilterableFields } from './user.constant';
import { userservise } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const { user, userProfile } = await userservise.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: { ...user, userProfile },
  });
});

const getdonorUser = catchAsync(async (req, res) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
  const result = await userservise.getdonorUserIntoDB(filters, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Donors successfully found',
    data: result,
  });
});

const getUserProfile = catchAsync(async (req, res) => {
  const result = await userservise.getUserProfileIntoDB(req.user);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Profile retrieved successfully',
    data: result,
  });
});

const updateUserProfile = catchAsync(async (req, res) => {
  const user = req.user
  const UpdateData = req.body
  const result = await userservise.UpdateUserProfileIntoDB(user, UpdateData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User profile updated successfully',
    data: result,
  });
});



export const UserControllers = {
  createUser,
  getdonorUser,
  getUserProfile,
  updateUserProfile,
};
