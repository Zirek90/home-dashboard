import { Link } from "@tanstack/react-router";

interface NavLinkProps {
  to: string;
  name: string;
  className?: string;
}

export function NavLink(props: NavLinkProps) {
  const { to, name, className = "" } = props;
  return (
    <Link
      to={to}
      className={`text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300 ${className}`}
    >
      {name}
    </Link>
  );
}
