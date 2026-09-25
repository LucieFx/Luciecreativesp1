import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().max(100).optional().or(z.literal("")),
  phone: z.string().max(30).optional().or(z.literal("")),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().optional().or(z.literal("")),
  message: z.string().min(5, "Message must be at least 5 characters").max(2000),
  // Anti-spam honeypot field. Must remain empty.
  hp_website: z.string().max(0, "Bot detected").optional().or(z.literal("")),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

