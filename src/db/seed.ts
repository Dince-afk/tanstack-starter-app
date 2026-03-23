import "dotenv/config";
import { db } from "./db";
import { reset, seed } from "drizzle-seed";
import * as schema from "./schema/schema";

async function main() {
  //   const data = await db.select().from(todosTable);
  console.log("Seeding 🌱...");
  //   await db.update(todosTable).set({ title: "New Value" });
  await reset(db, schema);
  await seed(db, schema, { count: 100 });
  console.log("Seeding finished 🌴");
}

main();
