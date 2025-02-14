import { useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { getPublicFilesQuery } from "@src/api/queries";
import { Dropzone, FileTable, Loader, ErrorPage } from "@src/components";
import { FileAction } from "@src/components/file-table/file-action-menu";
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

  return (
    <div className="flex justify-center pt-8">
      <div className="max-w-6xl w-full px-4 py-8 bg-white dark:bg-gray-950 shadow-lg rounded">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">Files</h2>
        <Dropzone maxSize={1073741824} />
        <FileTable
          data={files}
          columns={[
            { header: "File Name", key: "name" },
            { header: "Size", key: "size" },
            { header: "Uploaded by", key: "uploadedBy" },
            { header: "Date Upload", key: "createdAt" },
          ]}
          actions={(item) => <FileAction name={item.name} id={item.id} />}
        />
      </div>
    </div>
  );
}
