import { AVATAR_URL } from "@src/globals/api-url.constant";

interface AvatarProps {
  avatar: string | null;
  username: string;
  isBig?: boolean;
}
export function Avatar(props: AvatarProps) {
  const { avatar, username, isBig = false } = props;

  if (avatar) {
    return (
      <img
        src={`${AVATAR_URL}${avatar}`}
        alt="User Avatar"
        className={`${isBig ? "w-full h-full" : "w-8 h-8"} rounded-full object-cover`}
      />
    );
  }
  return (
    <div
      className={`${isBig ? "w-full h-full" : "w-8 h-8"}  bg-gray-600 rounded-full flex items-center justify-center text-white`}
    >
      <span>{username?.[0].toLocaleUpperCase()}</span>
    </div>
  );
}
