import z from 'zod';
const createUser = z.object({
  password: z.string({
    required_error: "Password is required",
  }),
  name: z.string({
    required_error: "Name is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email"),
  status: z.enum(["ACTIVE", "BlOCKED"]).optional(),
  bloodType: z.enum([
    "A_POSITIVE",
    "B_POSITIVE",
    "A_NEGATIVE",
    "B_NEGATIVE",
    "AB_POSITIVE",
    "AB_NEGATIVE",
    "O_POSITIVE",
    "O_NEGATIVE",
  ]),

  location: z.string(),
  availability: z.boolean().default(true),
});






export const userValidation = {
    createUser,

} 