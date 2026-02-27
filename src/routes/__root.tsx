import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
  errorComponent: ({ error }) => <div>{error.message}</div>,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-black text-white">
        <div className="py-4 space-x-4">
          <Link to="/">Home</Link>
          <Link to="/quote">Quote</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/todos">Todos</Link>
          <Link to="/about">About</Link>
        </div>
        {children}
        <TanStackDevtools
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
