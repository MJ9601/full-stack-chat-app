import { object, string, TypeOf } from "zod";

export const generalObject = {
  username: string({ required_error: "email is required" }).email(),
  password: string({ required_error: "password is required!" })
    .min(8, "password too short!")
    .max(32, "password too long"),
};

export const createUserSchema = object({
  body: object({
    ...generalObject,
    confirmedPassword: string({ required_error: "password is required!" })
      .min(8, "password is short!")
      .max(32, "password is too long!"),
  }).refine((data) => data.confirmedPassword === data.password, {
    message: "Passwords do not match!",
    path: ["confirmedPassword"],
  }),
});

export const sessionUserSchema = object({
  body: object({
    ...generalObject,
  }),
});

export type CreateUserSchema = TypeOf<typeof createUserSchema>["body"];
export type SessionUserSchema = TypeOf<typeof sessionUserSchema>["body"];
