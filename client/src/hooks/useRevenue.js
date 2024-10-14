import { useAxiosFetch } from "./useAxiosFetch";
import { formatDate } from "../utils/date.utils";

const getQuery = (startDate, endDate) => {
  return `startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}`;
};

const useRevenue = (date, groupBy = "day") => {
  const currentDate = new Date(date);
  let startDate = new Date(currentDate);
  let endDate = new Date(currentDate);

  if (groupBy === "day") {
    endDate.setDate(startDate.getDate() + 6); // Fetch for 7 days
  } else if (groupBy === "month") {
    startDate.setDate(1);
    endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
  } else if (groupBy === "year") {
    startDate.setMonth(0, 1);
    endDate = new Date(startDate.getFullYear(), 12, 0);
  }

  const currentQuery = getQuery(startDate, endDate);

  const { data: currentData } = useAxiosFetch(
    `/revenue?${currentQuery}&groupBy=${groupBy}`
  );

  return {
    currentData,
  };
};

export default useRevenue;
