import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useResetPassword } from "@src/api/mutations/useResetPassword";
import { Button, Input } from "@src/components";
import { useNotificationContext } from "@src/providers";
import { errorHandler } from "@src/utils";

export const Route = createFileRoute("/reset-password/$reset_token")({
  component: ResetPassword,
});

const schema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export function ResetPassword() {
  const { reset_token } = Route.useParams();
  const { mutateAsync: resetPassword } = useResetPassword();
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotificationContext();
  const { handleSubmit, control } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (data.newPassword !== data.confirmPassword) {
        showError("Passwords do not match");
        return;
      }

      await resetPassword({ ...data, reset_token });
      showSuccess("Password successfully changed");

      navigate({
        to: "/login",
      });
    } catch (error) {
      const errorMessage = errorHandler(error);

      console.error("Error during reset password:", error);
      showError(`An error occurred while resetting your password - ${errorMessage}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Reset Password</h2>

        <Input label="New Password" type="password" name="newPassword" control={control} />
        <Input label="Confirm New Password" type="password" name="confirmPassword" control={control} />
        <Button text="Reset" type="submit" />

        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            Remembered your password?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-700 dark:text-blue-400">
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
