import { z } from "zod";

export const applicationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name cannot exceed 80 characters")
    .regex(/^[a-zA-Z\s.]+$/, "Please enter a valid name (letters and spaces only)"),
  collegeEmail: z
    .string()
    .min(1, "College email is required")
    .email("Please enter a valid email address"),
  personalEmail: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  department: z.string().min(1, "Please select your academic department"),
  currentYear: z.string().min(1, "Please select your current year"),
  cgpa: z
    .number({ message: "CGPA must be a valid number" })
    .min(7.0, "Minimum 7.0 CGPA is required for Core Team consideration")
    .max(10.0, "CGPA cannot exceed 10.0"),
  technicalSkills: z
    .string()
    .min(10, "Please describe your technical skills (at least 10 characters)"),
  preferredPosition: z
    .string()
    .min(1, "Please select your preferred Core Team role"),
  whyJoin: z
    .string()
    .min(30, "Please explain your motivation in at least 30 characters"),
  projectLinks: z.string().optional().or(z.literal("")),
  linkedinUrl: z.string().optional().or(z.literal("")),
  agreeToPrivacy: z
    .boolean()
    .refine((val) => val === true, "You must agree to the application privacy terms"),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;
