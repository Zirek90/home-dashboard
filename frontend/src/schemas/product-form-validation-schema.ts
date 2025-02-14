import * as z from "zod";
import { CategoryEnum, CurrencyEnum } from "@src/enums";

export const ProductFormValidationSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  price: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, { message: "Price is required" }),
  shop: z.string().optional(),
  category: z.nativeEnum(CategoryEnum).default(CategoryEnum.GROCERY),
  currency: z.nativeEnum(CurrencyEnum).default(CurrencyEnum.PLN),
});
