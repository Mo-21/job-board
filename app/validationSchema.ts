import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "First Name is Required").max(255),
    lastName: z.string().min(1, "Last Name is Required").max(255),
    email: z.string().email("Invalid email").min(1, "Email is Required"),
    password: z
      .string()
      .min(1, "Password is Required")
      .min(8, "Password must be at least 8 characters long")
      .refine((value) => /\d/.test(value), {
        message: "Password must contain at least one number",
      })
      .refine((value) => /[a-z]/.test(value), {
        message: "Password must contain at least one lowercase letter",
      })
      .refine((value) => /[A-Z]/.test(value), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((value) => /[^a-zA-Z\d]/.test(value), {
        message: "Password must contain at least one special character",
      }),
    passwordConfirmation: z
      .string()
      .min(1, "Password Confirmation is Required"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords must match",
  });

export type RegistrationFormType = z.infer<typeof registerSchema>;
