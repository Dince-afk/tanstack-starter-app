import { createServerFn } from "@tanstack/react-start";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!);

export const getBlogs = createServerFn({ method: "GET" }).handler(async () => {
  console.log("Fetching blogs");
  const data = await sql`SELECT * FROM blogs`;
  return data;
});

// export async function getBlogs() {
//   console.log("Fetching blogs");
//   const data = await sql`SELECT * FROM blogs`;
//   return data;
// }
