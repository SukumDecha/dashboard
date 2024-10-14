import { useAxiosFetch } from "./useAxiosFetch";

export const useCustomerSatisfaction = (selectedDate) => {
  const query = `selectedDate=${selectedDate}`;

  const {
    data: customerSatisfactionData,
    error: customerSatisfactionError,
    isPending: isPending,
  } = useAxiosFetch(`/customers/satisfaction?${query}`);

  return { customerSatisfactionData, customerSatisfactionError, isPending };
};
