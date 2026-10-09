import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name cannot exceed 80 characters"),
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  subject: z
    .string()
    .min(4, "Subject must be at least 4 characters")
    .max(120, "Subject cannot exceed 120 characters"),
  message: z
    .string()
    .min(15, "Please provide details in at least 15 characters")
    .max(2000, "Message cannot exceed 2000 characters"),
  category: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
