import { useAxiosFetch } from "./useAxiosFetch";

const useServiceVolume = (startDate, groupBy = "month") => {
  const endDate =
    groupBy === "day"
      ? startDate
      : `${new Date(startDate).getFullYear() + 1}-01-01`;

  const currentQuery = `?groupBy=${groupBy}&startDate=${startDate}&endDate=${endDate}`;

  const { data } = useAxiosFetch(`/service-levels${currentQuery}`);

  return {
    data,
  };
};

export default useServiceVolume;
