import { useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { getPublicFilesQuery } from "@src/api/queries";
import { Dropzone, Loader, ErrorPage, Avatar, FileIcon, Tooltip, FileTable } from "@src/components";
import { FileAction } from "@src/components/action-items";
import { FileInterface } from "@src/interfaces";
import { mapFilesResponse } from "@src/mappers";

export const Route = createFileRoute("/_protected/file-manager")({
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
  component: FileManager,
  loader: async ({ context: { queryClient } }) => {
    const data = (await queryClient.ensureQueryData(getPublicFilesQuery)) || [];
    return mapFilesResponse(data);
  },
  pendingComponent: () => <Loader />,
  errorComponent: ({ reset, error }) => <ErrorPage message={error.message} onRetry={reset} />,
});

function FileManager() {
  const { data } = useSuspenseQuery(getPublicFilesQuery);
  const files = useMemo(() => {
    return mapFilesResponse(data);
  }, [data]);

  const columns: ColumnDef<FileInterface>[] = [
    {
      header: "File Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <FileIcon fileName={row.original.name} />
          <span>{row.original.name}</span>
        </div>
      ),
    },
    {
      header: "Size",
      accessorKey: "size",
    },
    {
      header: "Uploaded By",
      accessorKey: "uploadedBy",
      cell: ({ row }) => (
        <Tooltip message={row.original.uploadedBy.username}>
          <Avatar username={row.original.uploadedBy.username} avatar={row.original.uploadedBy.avatar} />
        </Tooltip>
      ),
    },
    {
      header: "Date Upload",
      accessorKey: "createdAt",
    },
  ];

  return (
    <div className="flex justify-center pt-8 px-10">
      <div className=" w-full px-8- py-8 bg-white dark:bg-gray-900 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100">Files</h2>
        <div className="space-y-6">
          <Dropzone maxSize={1073741824} />
        </div>
        <FileTable data={files} columns={columns} actions={(item) => <FileAction name={item.name} id={item.id} />} />
      </div>
    </div>
  );
}
