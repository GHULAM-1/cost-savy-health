import * as z from "zod";

export const formSchema = z.object({
  firstname: z.string().min(1).max(45),
  lastname: z.string().max(45),
  emailaddress: z.string().email().max(60),
  phonenumber: z.string().optional(),
  hear: z.string(),
  problemsolve: z.string(),
});

export type FormSchemaType = z.infer<typeof formSchema>;
