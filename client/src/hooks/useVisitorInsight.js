import { useAxiosFetch } from "./useAxiosFetch";

const useVisitorInsight = (endDate, groupBy = "month") => {
  const startDate =
    groupBy === "day" ? startDate : `${new Date(endDate).getFullYear()}-01-01`;

  const currentQuery = `?groupBy=${groupBy}&startDate=${startDate}&endDate=${endDate}`;

  const { data: visitors } = useAxiosFetch(`/customers${currentQuery}`);

  return {
    visitors,
  };
};

export default useVisitorInsight;
