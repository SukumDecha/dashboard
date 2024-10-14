import { useAxiosFetch } from "./useAxiosFetch";

const useCountrySale = (startDate, groupBy = "day") => {
  const currentQuery = `?groupBy=${groupBy}&date=${startDate}`;

  const { data: mapSales } = useAxiosFetch(`/country-sales${currentQuery}`);

  return {
    mapSales,
  };
};

export default useCountrySale;
