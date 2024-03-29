import catchAsync from '../../../utils/catchAsync';
import pick from '../../../utils/pick';
import sendResponse from '../../../utils/sendResponse';
import { userFilterableFields } from './user.constant';
import { userservise } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await userservise.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const getdonorUser = catchAsync(async (req, res) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
  const result = await userservise.getdonorUserIntoDB(filters, options);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Donor list',
    data: result,
  });
});







export const UserControllers = {
  createUser,
  getdonorUser
};
