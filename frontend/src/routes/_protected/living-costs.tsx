import { createFileRoute, redirect } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { useProductsQuery } from "@src/api/queries";
import { Avatar, ErrorPage, Loader, Tooltip } from "@src/components";
import { ProductTableWithFilters } from "@src/components/product-table-wih-filters";
import { ProductInterface } from "@src/interfaces";
import { getIconForCategory, formatDate } from "@src/utils";

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
  const { data, isLoading } = useProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  const productColumns: ColumnDef<ProductInterface>[] = [
    {
      header: "File Name",
      accessorKey: "name",
    },
    {
      header: "Price",
      accessorKey: "price",
    },
    {
      header: "Currency",
      accessorKey: "currency",
    },
    {
      header: "Shop",
      accessorKey: "shop",
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          {getIconForCategory(row.original.category)}
          <span>{row.original.category}</span>
        </div>
      ),
    },
    {
      header: "Created By",
      accessorKey: "createdBy",
      cell: ({ row }) => (
        <Tooltip message={row.original.createdBy.username}>
          <Avatar username={row.original.createdBy.username} avatar={row.original.createdBy.avatar} />
        </Tooltip>
      ),
    },
    {
      header: "Date",
      accessorKey: "createdAt",
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
  ];

  return (
    <div className="flex justify-center pt-8 px-10">
      <div className="w-full px-8 py-8 bg-white dark:bg-gray-950 shadow-lg rounded">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">Products</h2>
        <ProductTableWithFilters data={data || []} columns={productColumns} />
      </div>
    </div>
  );
}
