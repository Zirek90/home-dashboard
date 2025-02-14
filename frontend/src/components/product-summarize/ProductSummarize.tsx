import { TotalCostsInterface } from "@src/interfaces";

interface ProductSummarizeProps {
  totalCosts: TotalCostsInterface;
}
export function ProductSummarize(props: ProductSummarizeProps) {
  const { totalCosts } = props;

  return (
    <>
      <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-lg font-semibold flex justify-between">
        <span className="text-gray-700 dark:text-gray-300">Total Cost (EUR):</span>
        <span className="text-blue-600 dark:text-blue-400">€ {totalCosts.eur.toFixed(2)}</span>
      </div>
      <div className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-lg font-semibold flex justify-between">
        <span className="text-gray-700 dark:text-gray-300">Total Cost (PLN):</span>
        <span className="text-green-600 dark:text-green-400">PLN {totalCosts.pln.toFixed(2)}</span>
      </div>
    </>
  );
}
