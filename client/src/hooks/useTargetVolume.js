import { useAxiosFetch } from "./useAxiosFetch";

const useTargetVolume = (endDate, groupBy = "month") => {
  const startDate =
    groupBy === "day" ? startDate : `${new Date(endDate).getFullYear()}-01-01`;

  const currentQuery = `?groupBy=${groupBy}&startDate=${startDate}&endDate=${endDate}`;

  const { data: targets } = useAxiosFetch(`/targets${currentQuery}`);

  return {
    targets,
  };
};

export default useTargetVolume;
