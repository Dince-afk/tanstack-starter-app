import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdateFn(() => new Date()),
};

export const todosTable = pgTable("todos", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  ...timestamps,
  title: text().notNull(),
  done: boolean().default(false).notNull(),
});

export const blogsTable = pgTable("blogs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  ...timestamps,
  title: text().notNull(),
});

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  ...timestamps,
  firstName: text().notNull(),
  lastName: text().notNull(),
  email: text().notNull(),
});

export const authorsTable = pgTable("authors", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  ...timestamps,
  name: text().notNull(),
});

export const booksTable = pgTable("books", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  ...timestamps,
  authorId: integer()
    .notNull()
    .references(() => authorsTable.id),
  title: text().notNull(),
});
