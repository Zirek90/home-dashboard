import { CategoryEnum, CurrencyEnum } from "@src/enums";

export interface ProductFormValuesInterface {
  name: string;
  price: number;
  currency: CurrencyEnum;
  shop?: string;
  category: CategoryEnum;
}
