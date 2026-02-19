import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/test")({
  component: RouteComponent,
  loader: async () => {
    const res = await fetch("https://dummyjson.com/quotes");
    const data = await res.json();
    const randomQuote =
      data.quotes[Math.floor(Math.random() * data.quotes.length)];
    return randomQuote;
  },
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
