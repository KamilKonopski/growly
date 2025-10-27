import fs from "fs";
import path from "path";

import { User } from "../types/User";

const filePath = path.join(__dirname, "../data/users.json");

export const readUsers = (): User[] => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

export const writeUsers = (users: User[]) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");
};
