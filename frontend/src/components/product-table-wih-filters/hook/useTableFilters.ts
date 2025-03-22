import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { FilterFormValuesInterface, ProductInterface } from "@src/interfaces";

export function useTableFilters(data: ProductInterface[]) {
  const { control, watch } = useForm<FilterFormValuesInterface>({
    defaultValues: {
      name: "",
      shop: "",
      category: "",
      dateRange: { from: "", to: "" },
    },
  });

  const filters = watch();

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const itemDate = new Date(item.createdAt);
      const fromDate = filters.dateRange.from ? new Date(filters.dateRange.from) : null;
      const toDate = filters.dateRange.to ? new Date(filters.dateRange.to) : null;

      return (
        (!filters.name || item.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (!filters.shop || item.shop?.toLowerCase().includes(filters.shop.toLowerCase())) &&
        (!filters.category || item.category === filters.category) &&
        (!fromDate || itemDate >= fromDate) &&
        (!toDate || itemDate <= toDate)
      );
    });
  }, [filters, data]);

  return { control, filteredData };
}
