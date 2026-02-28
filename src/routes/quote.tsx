import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/quote")({
  component: RouteComponent,
  loader: async () => {
    const ranNum = Math.floor((Math.random() + 1) * 25);
    console.log("Fetching quote", ranNum);
    const res = await fetch(`https://dummyjson.com/quotes/${ranNum}`);
    const data = await res.json();
    return data;
  },
  // preloadStaleTime: 15_000,
  staleTime: 10_000,
});

function RouteComponent() {
  const randomQuote = Route.useLoaderData();
  return (
    <center className="py-10">
      <h1 className="text-lg font-semibold pb-4">Quote</h1>
      <p className="max-w-prose">{randomQuote.quote}</p>
      <p className="italic font-extralight py-2">{randomQuote.author}</p>
    </center>
  );
}
