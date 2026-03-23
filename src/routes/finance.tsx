// import { db } from "@/db";
// import { blogsTable } from "@/db/schema";
import { getSession } from "@/lib/auth.functions";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/finance")({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session) {
      throw redirect({ to: "/login" });
    }
    return { user: session.user };
  },

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
