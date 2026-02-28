import { getBlogs } from "@/features/blogs/db";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blogs")({
  component: RouteComponent,
  loader: async () => {
    return await getBlogs();
  },
  preloadStaleTime: 10_000,
  staleTime: 10_000,
});

function RouteComponent() {
  const blogs = Route.useLoaderData();
  return (
    <center>
      <h1 className="text-lg">Blog</h1>
      <ul>
        {blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>;
        })}
      </ul>
    </center>
  );
}
