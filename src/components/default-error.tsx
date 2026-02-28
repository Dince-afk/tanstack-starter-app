import { type ErrorComponentProps } from "@tanstack/react-router";

export default function DefaultError(props: ErrorComponentProps) {
  return (
    <center className="pt-[15vh]">
      <h1>Something went wrong!</h1>
      <p>{props.error.name}</p>
      <p>{props.error.message}</p>
      <button onClick={() => props.reset()}>Reset</button>
    </center>
  );
}
