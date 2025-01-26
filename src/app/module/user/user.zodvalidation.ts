import z from 'zod';
const createUser = z.object({
  password: z.string({
    required_error: "Password is required",
  }),
  username: z.string({
    required_error: "Email is required",
  }),
});

export const userValidation = {
  createUser,
}; 