import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/test")({
  component: RouteComponent,
  loader: async () => {
    const ranNum = Math.floor((Math.random() + 1) * 25);
    const res = await fetch(`https://dummyjson.com/quotes/${ranNum}`);
    const data = await res.json();
    return data;
  },
  staleTime: 10_000,
});

function RouteComponent() {
  const randomQuote = Route.useLoaderData();
  return (
    <center className="text-white py-10">
      <div>Hello "/test"!</div>
      <p>{randomQuote.quote}</p>
      <p>{randomQuote.author}</p>
    </center>
  );
}
