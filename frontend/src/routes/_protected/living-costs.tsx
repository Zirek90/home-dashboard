import { createFileRoute, redirect } from "@tanstack/react-router";
import { ErrorPage } from "@src/components";
import { TableWithFilters } from "@src/components/table-wih-filters";

export const Route = createFileRoute("/_protected/living-costs")({
  beforeLoad: ({ context }) => {
    const { auth, loginPending } = context.authentication;
    if (loginPending) {
      return;
    }

    if (!auth) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: RouteComponent,
  errorComponent: ({ reset, error }) => <ErrorPage message={error.message} onRetry={reset} />,
});

function RouteComponent() {
  return (
    <div className="flex justify-center pt-8 px-10">
      <div className="w-full px-8 py-8 bg-white dark:bg-gray-950 shadow-lg rounded">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">Products</h2>
        <TableWithFilters />
      </div>
    </div>
  );
}
