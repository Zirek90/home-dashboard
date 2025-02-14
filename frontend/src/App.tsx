import { createRouter, RouterProvider } from "@tanstack/react-router";
import { queryClient } from "./api/query-client";
import { Notification } from "./components";
import { useAuthContext } from "./providers";
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree, context: { authentication: undefined!, queryClient: queryClient } });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  const authentication = useAuthContext();

  return (
    <>
      <RouterProvider router={router} context={{ authentication }} />
      <Notification />
    </>
  );
}
