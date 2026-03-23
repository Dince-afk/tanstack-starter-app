import { signIn } from "@/lib/auth-client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <center>
      {/* <h1>Login</h1> */}
      <form
        className="flex flex-col w-3xs"
        action={async (formData: FormData) => {
          const email = formData.get("email")?.toString();
          const password = formData.get("password")?.toString();
          if (!email || !password) return;
          const { data, error } = await signIn.email({ email, password });
          console.log({ data, error });
        }}
      >
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="border"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="border"
        />
        <button type="submit">Login</button>
      </form>
    </center>
  );
}
