import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, ErrorPage, TextInput, Loader, PasswordInput } from "@src/components";
import { useAuthContext } from "@src/providers";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export const Route = createFileRoute("/register")({
  component: Register,
  pendingComponent: () => <Loader />,
  errorComponent: ({ reset, error }) => <ErrorPage message={error.message} onRetry={reset} />,
});

function Register() {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  const { handleRegister, registerPending } = useAuthContext();

  const onSubmit = async (data: FormData) => {
    try {
      await handleRegister(data);
      navigate({
        to: "/login",
      });
    } catch (err) {
      console.error("Failed to register", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <TextInput label="Username" type="text" name="username" control={control} />
        <TextInput label="Email" type="email" name="email" control={control} />
        <PasswordInput label="Password" name="password" control={control} />
        <Button pending={registerPending} text="Register" type="submit" />

        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            You have an account already?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-700">
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
