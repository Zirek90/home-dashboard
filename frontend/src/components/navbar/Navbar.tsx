import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useProfileQuery } from "@src/api/queries";
import logo from "@src/assets/logo.jpg";
import { useAuthContext } from "@src/providers";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme-toggle";
import { Avatar } from "../avatar";

function AuthorizedLinks() {
  const { handleLogout: logout } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout();
    navigate({
      to: "/login",
      replace: true,
    });
  };

  return (
    <>
      {location.pathname === "/profile" ? (
        <NavLink to="/file-manager" name="File Manager" />
      ) : (
        <NavLink to="/profile" name="Profile" />
      )}
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

function NonAuthorizedLinks() {
  return (
    <>
      <NavLink to="/login" name="Login" />
      <NavLink to="/register" name="Register" />
    </>
  );
}

export function Navbar() {
  const { auth } = useAuthContext();
  const { data } = useProfileQuery(auth?.user_id);

  return (
    <div className="flex justify-between items-center pb-2 border-b border-gray-300">
      <div className="flex items-center">
        <Link to="/">
          <img className="w-10 h-10 bg-gray-300 rounded-full" src={logo} alt="logo" />
        </Link>
        <p className="ml-5 text-lg font-semibold text-gray-700">{import.meta.env.VITE_BASE_NAME}</p>
      </div>
      <div className="ml-auto flex gap-2  items-center">
        {!auth ? <NonAuthorizedLinks /> : <AuthorizedLinks />}
        <ThemeToggle />
        {auth && data && <Avatar username={data.username} avatar={data.avatar} />}
      </div>
    </div>
  );
}
