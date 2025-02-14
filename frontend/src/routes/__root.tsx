import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Navbar } from "@src/components";
import { useAuthContext } from "@src/providers";

type RouterContext = {
  authentication: ReturnType<typeof useAuthContext>;
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div className="p-2 min-h-screen bg-primary-light dark:bg-primary-dark transition-all">
      <Navbar />
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </div>
  ),
});
