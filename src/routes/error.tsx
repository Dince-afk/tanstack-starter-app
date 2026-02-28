import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/error")({
  component: RouteComponent,
});

function RouteComponent() {
  throw new Error("Mock error for testing purposes");
  return <div>Error happens on this route</div>;
}
