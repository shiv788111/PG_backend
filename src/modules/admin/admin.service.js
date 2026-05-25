import { checkEmailExists, createAdminUser } from "./admin.model.js";

export const createAdmin = async (payload) => {
  const { name, email, password } = payload;

  const emailExists = await checkEmailExists(email);

  if (emailExists) {
    throw new Error("Email already exists");
  }

  await createAdminUser({
    name,
    email,
    password,
  });

  return null;
};
