import { FieldPath, FieldValues, UseControllerProps, useController } from "react-hook-form";

type DateRangeInputProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = UseControllerProps<
  TFieldValues,
  TName
> & {
  label: string;
};

export function DateRangeInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: DateRangeInputProps<TFieldValues, TName>) {
  const { label, control, name } = props;
  const {
    field: { value, onChange },
  } = useController({ control, name });

  return (
    <div className="mb-4">
      <label className="block">{label}</label>
      <div className="flex gap-2">
        <input
          type="date"
          value={value?.from || ""}
          onChange={(e) => onChange({ ...value, from: e.target.value })}
          className="w-1/2 p-2 border rounded bg-white dark:bg-gray-800"
        />
        <input
          type="date"
          value={value?.to || ""}
          onChange={(e) => onChange({ ...value, to: e.target.value })}
          className="w-1/2 p-2 border rounded bg-white dark:bg-gray-800"
        />
      </div>
    </div>
  );
}
