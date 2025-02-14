import { Control } from "react-hook-form";
import { CategoryEnum, CurrencyEnum } from "@src/enums";
import { ProductFormValuesInterface } from "@src/interfaces";
import { TextInput, Select, NumberInput } from "../shared";

interface ProductFormProps {
  control: Control<ProductFormValuesInterface>;
}

export function ProductForm(props: ProductFormProps) {
  const { control } = props;

  return (
    <>
      <TextInput label="Name" control={control} name="name" />
      <NumberInput label="Price" control={control} name="price" />
      <TextInput label="Shop" control={control} name="shop" />
      <Select
        label="Category"
        control={control}
        name="category"
        options={Object.values(CategoryEnum).map((category) => ({ label: category, value: category }))}
      />
      <Select
        label="Currency"
        control={control}
        name="currency"
        options={Object.values(CurrencyEnum).map((currency) => ({ label: currency, value: currency }))}
      />
    </>
  );
}
