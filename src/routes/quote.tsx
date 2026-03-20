import { renderTime } from "@/lib/helper";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/quote")({
  component: RouteComponent,
  loader: async () => {
    const ranNum = Math.floor((Math.random() + 1) * 25);
    console.log("Fetching quote", ranNum);
    const res = await fetch(`https://dummyjson.com/quotes/${ranNum}`);
    const quote: { quote: string; author: string; id: number } =
      await res.json();
    return quote;
  },
  preloadStaleTime: 30_000,
  staleTime: 0,
});

function RouteComponent() {
  const randomQuote = Route.useLoaderData();
  return (
    <center className="py-10">
      <p>{renderTime()}</p>
      <h1 className="text-lg font-semibold pb-4">Quote</h1>
      <p className="max-w-prose">{randomQuote.quote}</p>
      <p className="italic font-extralight py-2">{randomQuote.author}</p>
      <p>{randomQuote.id}</p>
    </center>
  );
}
