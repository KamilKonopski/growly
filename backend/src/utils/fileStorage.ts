import fs from "fs";
import path from "path";

import { User } from "../types/User";

// Funkcja do czytania dowolnego pliku JSON
const readData = <T>(fileName: string): T[] => {
  const filePath = path.join(__dirname, "../data", fileName);

  if (!fs.existsSync(filePath)) return [];

  const data = fs.readFileSync(filePath, "utf-8");
  try {
    return JSON.parse(data) as T[];
  } catch (err) {
    console.error(`Błąd parsowania pliku ${fileName}: `, err);
    return [];
  }
};

// Funkcja do zapisu danych do pliku JSON
const writeData = <T>(fileName: string, data: T[]): void => {
  const filePath = path.join(__dirname, "../data", fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};

// TABELA USERS
export const readUsers = () => readData<User>("users.json");
export const writeUsers = (users: User[]) =>
  writeData<User>("users.json", users);
