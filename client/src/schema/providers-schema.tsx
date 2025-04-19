import * as z from "zod";

export const providersSchema = z.object({
  searchCare: z.string().optional(),
  zipCode: z.string().optional(),
  insurance: z.string().optional(),
});
export type ProvidersSchemaType = z.infer<typeof providersSchema>;
