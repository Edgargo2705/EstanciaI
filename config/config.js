import { dataEnv } from "./env.config.js";

export const db = {
  user: dataEnv.parsed.USER,
  host: dataEnv.parsed.HOST,
  database: dataEnv.parsed.DATABASE,
  password: dataEnv.parsed.PASSWORD,
};

export const api = {
  port: dataEnv.parsed.PORT,
};

