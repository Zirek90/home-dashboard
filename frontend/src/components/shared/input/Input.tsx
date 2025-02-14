import { useState } from "react";
import { FieldPath, FieldValues, useController, UseControllerProps } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { FiEyeOff } from "react-icons/fi";

type InputProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = UseControllerProps<
  TFieldValues,
  TName
> & {
  label: string;
  className?: string;
  type?: "text" | "email";
};

export function TextInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: InputProps<TFieldValues, TName>) {
  const { label, control, name, type = "text", className = "" } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block">
        {label}
      </label>
      <input
        type={type}
        id={name}
        {...field}
        className={`w-full p-2 border rounded mt-1 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${error ? "border-red-500" : "border-gray-300"}`}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}

export function NumberInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: Omit<InputProps<TFieldValues, TName>, "type">) {
  const { label, control, name, className = "" } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block">
        {label}
      </label>
      <input
        type="number"
        id={name}
        {...field}
        value={field.value ?? ""}
        onChange={(e) => {
          const value = e.target.value === "" ? undefined : Number(e.target.value);
          field.onChange(value);
        }}
        className={`w-full p-2 border rounded mt-1 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        step="any"
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}

export function PasswordInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: InputProps<TFieldValues, TName>) {
  const { label, control, name, className = "" } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={name}
          {...field}
          className={`w-full p-2 border rounded mt-1 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-2 flex items-center text-gray-500 dark:text-gray-400"
        >
          {showPassword ? <FiEyeOff size={20} /> : <FaEye size={20} />}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}
