import z from "zod";

const useForgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

export type ForgotPasswordSchemaType = z.infer<typeof useForgotPasswordSchema>;

export default useForgotPasswordSchema;
