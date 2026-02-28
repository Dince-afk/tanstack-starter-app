import { type NotFoundRouteProps } from "@tanstack/react-router";

export default function DefaultNotFound(props: NotFoundRouteProps) {
  return (
    <center className="pt-[15vh]">
      <h1>Page not found!</h1>
      <p>404</p>
      <p>{props.routeId}</p>
    </center>
  );
}
