import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useAuthContext } from "@src/providers";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { auth } = useAuthContext();

  return auth ? <Navigate to="/file-manager" /> : <Navigate to="/login" />;
}
