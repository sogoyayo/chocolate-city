import * as z from "zod";

// ============================================================
// USER
// ============================================================
export const SignupValidation = z.object({
  // name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  // username: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

// ============================================================
// POST
// ============================================================
export const PostValidation = z.object({
  // postId: z.number().int().positive({ message: "Post ID must be a positive integer." }),
  // postId: z.string().min(5, { message: "Minimum 5 characters." }),
  postId: z
    .string()
    .refine((val) => !isNaN(Number(val)), { message: "Post ID must be a number." })
    .transform((val) => Number(val)),
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email format." }),
  body: z.string().min(5, { message: "Minimum 5 characters." }).max(200, { message: "Maximum 200 characters" }),
});
