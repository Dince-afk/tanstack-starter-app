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

export const todosTable = pgTable("todo", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text().notNull(),
  done: boolean().default(false).notNull(),
  ...timestamps,
});

export const blogsTable = pgTable("blog", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text().notNull(),
  ...timestamps,
});

export const authorsTable = pgTable("author", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  ...timestamps,
});

export const booksTable = pgTable("book", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  authorId: integer()
    .notNull()
    .references(() => authorsTable.id),
  title: text().notNull(),
  ...timestamps,
});
