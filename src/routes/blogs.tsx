import { getBlogs } from "@/features/blogs/db";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blogs")({
  component: RouteComponent,
  loader: async () => {
    return await getBlogs();
  },
});

function RouteComponent() {
  const blogs = Route.useLoaderData();
  return (
    <center>
      <h1 className="text-lg">Hello "/blogs"!</h1>
      <ul>
        {/* {blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>;
        })} */}
        <p>{blogs}</p>
      </ul>
    </center>
  );
}
