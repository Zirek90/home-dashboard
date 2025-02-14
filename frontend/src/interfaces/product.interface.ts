import { CategoryEnum, CurrencyEnum } from "@src/enums";

export interface ProductInterface {
  id: string;
  name: string;
  price: number;
  currency: CurrencyEnum;
  shop?: string;
  category: CategoryEnum;
  createdAt: string;
  createdBy: {
    id: string;
    username: string;
    avatar: string | null;
  };
}
