import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
  linkOptions,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import appCss from "../styles.css?url";

const options = linkOptions([
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Todos", to: "/todos" },
  { label: "Quote", to: "/quote" },
  { label: "Blog", to: "/blogs" },
]);

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-4 space-x-4">
          {options.map((option) => {
            return (
              <Link
                {...option}
                to={option.to}
                key={option.to}
                className="hover:underline"
                activeProps={{ className: "underline" }}
              >
                {option.label}
              </Link>
            );
          })}
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
