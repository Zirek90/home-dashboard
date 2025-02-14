import { Control } from "react-hook-form";
import { CategoryEnum } from "@src/enums";
import { FilterFormValuesInterface } from "@src/interfaces";
import { DateRangeInput } from "../shared/date-range-input";
import { TextInput } from "../shared/input";
import { Select } from "../shared/select";

interface FilterTableProps {
  control: Control<FilterFormValuesInterface>;
}

export function FilterableTable(props: FilterTableProps) {
  const { control } = props;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <TextInput label="Name" type="text" control={control} name="name" />
      <TextInput label="Shop" type="text" control={control} name="shop" />
      <Select
        label="Category"
        control={control}
        name="category"
        options={Object.values(CategoryEnum).map((category) => ({ label: category, value: category }))}
      />
      <DateRangeInput label="Date Range" control={control} name="dateRange" />
    </div>
  );
}
