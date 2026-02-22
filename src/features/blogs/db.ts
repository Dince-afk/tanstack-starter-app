// import { createServerFn } from "@tanstack/react-start";
// import postgres from "postgres";
import fs from "fs/promises";

// const sql = postgres(process.env.DATABASE_URL!);

// export const getBlogs = createServerFn({ method: "GET" }).handler(async () => {
//   console.log("Fetching blogs");
//   const data = await sql`SELECT * FROM blogs`;
//   return data;
// });

export async function getBlogs() {
  const a = await fs.readFile("test.txt", { encoding: "utf-8" });
  console.log(a);
  console.log("Fetching blogs");
  // const data = await sql`SELECT * FROM blogs`;
  return a;
}
