import z from "zod";

const useResetPasswordSchema = z
  .object({
    password: z
      .string({ message: "Password is required" })
      .min(8, "At least 8 characters")
      .regex(/\d/, "Must contain at least one number"),
    confirmPassword: z.string({ message: "Confirm password is required" }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchemaType = z.infer<typeof useResetPasswordSchema>;

export default useResetPasswordSchema;
