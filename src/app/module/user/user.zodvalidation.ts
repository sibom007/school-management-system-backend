import z from 'zod';
const createUser = z.object({
  password: z.string({
    required_error: "Password is required",
  }),
  name: z.string({
    required_error: "Name is required",
  }),
  username: z.string({
    required_error: "Email is required",
  }),
  status: z.enum(["ACTIVE", "BlOCKED"]).optional(),
});

export const userValidation = {
  createUser,
}; 