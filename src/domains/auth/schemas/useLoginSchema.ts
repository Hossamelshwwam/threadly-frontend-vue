import z from "zod";

const useLoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string({ message: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});

export type LoginSchemaType = z.infer<typeof useLoginSchema>;

export default useLoginSchema;
