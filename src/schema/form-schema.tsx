import * as z from "zod";

export const formSchema = z.object({
  firstname: z.string().min(1).max(45),
  lastname: z.string().max(45),
  emailaddress: z.string().email().max(60),
  phonenumber: z.string().optional(),
  jobtitle: z.string().max(50),
  organization: z.string().min(1).max(50),
  organizationtype: z.string().min(1),
  hear: z.string(),
  problemsolve: z.string(),
});

export type FormSchemaType = z.infer<typeof formSchema>;
