import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, ErrorPage, Input, Loader, PasswordInput } from "@src/components";
import { useAuthContext } from "@src/providers";

export const Route = createFileRoute("/login")({
  component: Login,
  pendingComponent: () => <Loader />,
  errorComponent: ({ reset, error }) => <ErrorPage message={error.message} onRetry={reset} />,
});

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

function Login() {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  const { handleLogin, loginPending } = useAuthContext();

  const onSubmit = async (data: FormData) => {
    try {
      await handleLogin(data);
      setTimeout(() => {}, 500); //* Add small timeout here so we make sure token is assgned
      navigate({
        to: "/file-manager",
      });
    } catch (err) {
      console.error("Failed to login", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Login</h2>

        <Input label="Email" type="email" name="email" control={control} />
        <PasswordInput label="Password" type="password" name="password" control={control} />

        <Button pending={loginPending} text="Login" type="submit" />

        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            Forgot password?{" "}
            <Link to="/forgot-password" className="text-blue-500 hover:text-blue-700 dark:text-blue-400">
              Click here
            </Link>
          </p>
          <p>
            You don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:text-blue-700 dark:text-blue-400">
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
