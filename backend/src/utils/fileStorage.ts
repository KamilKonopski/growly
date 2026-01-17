import fs from "fs";
import path from "path";

import { User } from "../types/User";
import { Habit, HabitLog } from "../types/Habit";
import { LearningPath } from "../types/Learning";

// Function to read any JSON file
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

// Function for writing data to a JSON file
const writeData = <T>(fileName: string, data: T[]): void => {
  const filePath = path.join(__dirname, "../data", fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};

// USERS TABLE
export const readUsers = () => readData<User>("users.json");
export const writeUsers = (users: User[]) =>
  writeData<User>("users.json", users);

// HABITS TABLE
export const readHabits = () => readData<Habit>("habits.json");
export const writeHabits = (habits: Habit[]) =>
  writeData<Habit>("habits.json", habits);

// HABITLOGS TABLE
export const readHabitLogs = () => readData<HabitLog>("habitLogs.json");
export const writeHabitLogs = (habitLogs: HabitLog[]) =>
  writeData<HabitLog>("habitLogs.json", habitLogs);

// LEARNINGPATHS TABLE
export const readLearningPaths = () =>
  readData<LearningPath>("learningPaths.json");
export const writeLearningPaths = (learningPaths: LearningPath[]) =>
  writeData<LearningPath>("learningPaths.json", learningPaths);
