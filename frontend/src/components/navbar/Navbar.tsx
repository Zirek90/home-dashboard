import { Link, useNavigate } from "@tanstack/react-router";
import { useProfileQuery } from "@src/api/queries";
import logo from "@src/assets/logo.jpg";
import { useAuthContext } from "@src/providers";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "../shared";
import { Avatar } from "../shared/avatar";

function AuthorizedLinks() {
  const { handleLogout: logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout();
    navigate({
      to: "/login",
      replace: true,
    });
  };

  return (
    <div className="flex gap-4 items-center">
      <NavLink to="/living-costs" name="Living Costs" />
      <NavLink to="/file-manager" name="File Manager" />
      <NavLink to="/profile" name="Profile" />
      <Button
        onClick={handleLogout}
        className="bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 !w-20"
        text="Logout"
      />
    </div>
  );
}

function NonAuthorizedLinks() {
  return (
    <div className="flex gap-4 items-center">
      <NavLink to="/login" name="Login" />
      <NavLink to="/register" name="Register" />
    </div>
  );
}

export function Navbar() {
  const { auth } = useAuthContext();
  const { data } = useProfileQuery(auth?.user_id);

  return (
    <div className="flex justify-between items-center px-6 py-3 bg-white dark:bg-gray-900 shadow-md">
      <div className="flex items-center gap-4">
        <Link to="/">
          <img className="w-12 h-12 bg-gray-300 rounded-full" src={logo} alt="logo" />
        </Link>
      </div>

      <div className="flex gap-6 items-center">
        {!auth ? <NonAuthorizedLinks /> : <AuthorizedLinks />}
        <ThemeToggle />
        {auth && data && <Avatar username={data.username} avatar={data.avatar} />}
      </div>
    </div>
  );
}
