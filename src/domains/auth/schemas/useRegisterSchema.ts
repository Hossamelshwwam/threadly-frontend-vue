import z from "zod";

const useRegisterSchema = z
  .object({
    name: z
      .string({ message: "Name is required" })
      .min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z
      .string({ message: "Password is required" })
      .min(8, "At least 8 characters")
      .regex(/\d/, "Must contain at least one number"),
    confirmPassword: z.string({ message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof useRegisterSchema>;

export default useRegisterSchema;
