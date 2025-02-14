import { Link } from "@tanstack/react-router";

interface NavLinkProps {
  to: string;
  name: string;
  className?: string;
}

export function NavLink(props: NavLinkProps) {
  const { to, name, className = "" } = props;
  return (
    <Link to={to} className={`text-black dark:text-white ${className}`}>
      {name}
    </Link>
  );
}
