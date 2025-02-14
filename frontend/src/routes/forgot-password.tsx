import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useForgotPassword } from "@src/api/mutations";
import { Button, ErrorPage, TextInput } from "@src/components";
import { useNotificationContext } from "@src/providers";
import { errorHandler } from "@src/utils";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPassword,
  errorComponent: ({ reset, error }) => <ErrorPage message={error.message} onRetry={reset} />,
});

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof schema>;

export function ForgotPassword() {
  const [tokenSent, setTokenSent] = useState(false);
  const { handleSubmit, control } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { mutateAsync: forgotPassword } = useForgotPassword();
  const { showError } = useNotificationContext();

  const onSubmit = async (data: FormData) => {
    try {
      await forgotPassword(data);
      setTokenSent(true);
    } catch (error) {
      const errorMessage = errorHandler(error);

      console.error("Error during forgot password:", error);
      showError(`An error occurred while requesting the reset link - ${errorMessage}`);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      {tokenSent ? (
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md text-center">
          <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">Reset token was sent to your email.</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Forgot Password</h2>

          <TextInput label="Email" type="email" name="email" control={control} />
          <Button text="Reset Password" type="submit" />

          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              Remembered your password?{" "}
              <Link to="/login" className="text-blue-500 hover:text-blue-700 dark:text-blue-400">
                Login here
              </Link>
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
