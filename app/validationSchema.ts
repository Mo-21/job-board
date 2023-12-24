import { z } from "zod";

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, "First Name is Required")
    .max(255)
    .regex(/^[a-zA-Z]*$/, {
      message: "First Name must contain only English alphabets",
    }),
  lastName: z
    .string({
      invalid_type_error: "Last Name must be a string",
    })
    .min(2, "Last Name is Required")
    .max(255)
    .regex(/^[a-zA-Z]*$/, {
      message: "Last Name must contain only English alphabets",
    }),
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
  passwordConfirmation: z.string().min(1, "Password Confirmation is Required"),
  image: z.string().optional().nullable(),
});

export const validatePasswords = (data: RegistrationFormType) => {
  try {
    registerSchema.parse(data);
    if (data.password !== data.passwordConfirmation) return false;
    return true;
  } catch (error) {
    console.log(error);
  }
};

export type RegistrationFormType = z.infer<typeof registerSchema>;
