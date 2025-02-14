import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useDeleteAvatar, useUpdateAvatar } from "@src/api/mutations";
import { getProfileQuery } from "@src/api/queries";
import { ErrorPage } from "@src/components";
import { Avatar } from "@src/components/avatar";

export const Route = createFileRoute("/_protected/profile")({
  beforeLoad: ({ context }) => {
    const { auth } = context.authentication;
    if (!auth) {
      throw redirect({
        to: "/login",
      });
    }
  },
  loader: async ({ context: { queryClient } }) => {
    return (await queryClient.ensureQueryData(getProfileQuery)) || [];
  },
  component: Profile,
  errorComponent: ({ reset, error }) => <ErrorPage message={error.message} onRetry={reset} />,
});

export function Profile() {
  const { data } = useSuspenseQuery(getProfileQuery);
  const { username, email, avatar } = data;

  const { mutateAsync: updateAvatar, isPending } = useUpdateAvatar();
  const { mutate: deleteAvatar } = useDeleteAvatar();

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);
      await updateAvatar(formData);
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  return (
    <div className="flex justify-center pt-8">
      <div className="max-w-lg w-full px-6 py-8 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Profile</h1>

        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-4xl font-semibold text-white overflow-hidden">
              <Avatar username={username} avatar={avatar} isBig />
            </div>

            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg"
            >
              <FaPlus className="h-4 w-4 text-white" />
              <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </label>
            {avatar && (
              <button
                onClick={() => deleteAvatar()}
                className="absolute top-0 right-0 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center cursor-pointer shadow-md"
              >
                <FaTrash className="w-3 h-3" />
              </button>
            )}
          </div>

          <div>
            <p className="text-lg">
              username: <span className="font-semibold">{username}</span>
            </p>
            <p className="text-lg">
              email: <span className="font-semibold">{email}</span>
            </p>
          </div>

          {isPending && <p className="text-sm text-blue-500">Uploading avatar, please wait...</p>}
        </div>
      </div>
    </div>
  );
}
