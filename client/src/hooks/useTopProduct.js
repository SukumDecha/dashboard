import { useAxiosFetch } from "./useAxiosFetch";

const useTopProducts = (endDate, sortBy = "sales", sortOrder = "desc") => {
  const currentQuery = `?sortBy=${sortBy}&sortOrder=${sortOrder}&endDate=${endDate}`;

  const { data: topProducts } = useAxiosFetch(`/products${currentQuery}`);

  return {
    topProducts,
  };
};

export default useTopProducts;
