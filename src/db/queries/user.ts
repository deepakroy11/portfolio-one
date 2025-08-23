import { db } from "@/db";

export const fetchUsers = () => {
  return db.user.findMany();
};
