import { FieldPath, FieldValues, UseControllerProps, useController } from "react-hook-form";

type SelectProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = UseControllerProps<
  TFieldValues,
  TName
> & {
  label: string;
  options: { label: string; value: string }[];
  className?: string;
};

export function Select<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: SelectProps<TFieldValues, TName>) {
  const { label, options, control, name, className = "" } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block">
        {label}
      </label>
      <select
        id={name}
        {...field}
        className={`w-full p-2 border rounded mt-1 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">All</option>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}
