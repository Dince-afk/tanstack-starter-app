// import { db } from "@/db";
// import { blogsTable } from "@/db/schema";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/finance")({
  component: RouteComponent,
  // loader: async () => {
  //   const data = await db.select().from(blogsTable);
  //   return data;
  // },
});

function RouteComponent() {
  // const data = Route.useLoaderData();
  return (
    <div>
      <p>FINANCE</p>
      {/* {data.map((el) => {
        return <div>{el.title}</div>;
      })} */}
    </div>
  );
}
