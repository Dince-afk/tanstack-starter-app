import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: RouteComponent });

function RouteComponent() {
  return <center className="text-3xl font-bold pt-8">TANSTACK START</center>;
}
