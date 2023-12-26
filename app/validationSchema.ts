import { title } from "process";
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

const linkSchema = z
  .string()
  .max(255, "Maximum 255 Characters Allowed")
  .optional()
  .nullable();

export const profileCreationSchema = z.object({
  name: z
    .string()
    .min(2, "Name is Required")
    .max(255)
    .regex(/^[a-zA-Z\s]*$/, {
      message: "First Name must contain only English alphabets",
    }),
  bio: z.string().max(255).optional().nullable(),
  location: z.string().min(1, "Location is Required").max(255),
  skills: z.array(z.string()).min(1, "Skills is Required").max(10),
  projects: z
    .array(
      z.object({
        title: z.string().min(1, "Title is Required").max(255),
        description: z.string().max(2000),
        skills: z.array(z.string()).min(1, "Skills is Required").max(10),
      })
    )
    .min(1, "Projects is Required")
    .max(3),
  workExperience: z
    .array(
      z.object({
        title: z.string().min(1, "Title is Required").max(255),
        company: z.string().min(1, "Company is Required").max(255),
        description: z.string().max(2000).optional().nullable(),
        location: z.string().min(1, "Location is Required").max(255),
        startDate: z.string().min(1, "Start Date is Required").max(255),
        endDate: z.string().min(1, "End Date is Required").max(255),
      })
    )
    .min(1, "Work is Required")
    .max(2, "Only 2 Work Experiences are Allowed"),
  education: z
    .array(
      z.object({
        school: z.string().min(1, "School is Required").max(255),
        degree: z.string().min(1, "Degree is Required").max(255),
        location: z.string().min(1, "Location is Required").max(255),
        startDate: z.string(),
        endDate: z.string(),
      })
    )
    .min(1, "Education is Required")
    .max(2, "Only 2 Education Experiences are Allowed"),
  links: z.object({
    linkedin: linkSchema,
    github: linkSchema,
    portfolio: linkSchema,
  }),
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
export type ProfileCreationFormType = z.infer<typeof profileCreationSchema>;
