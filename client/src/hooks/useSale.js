import { formatDate } from "../utils/date.utils";
import { useAxiosFetch } from "./useAxiosFetch";

const getMonthQuery = (year, month) => {
  const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
  const endDate = `${year}-${String(month).padStart(2, "0")}-01`;
  return `startDate=${startDate}&endDate=${endDate}`;
};

const getYearQuery = (year) => {
  return `startDate=${year}-01-01&endDate=${year}-12-31`;
};

const useSale = (date, groupBy, findMany) => {
  const currentDate = new Date(date);
  const previousDate = new Date(currentDate);
  previousDate.setDate(previousDate.getDate() - 1);

  let currentQuery, previousQuery;

  if (groupBy === "month") {
    const currentMonth = currentDate.getMonth() + 1;
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const currentYear = currentDate.getFullYear();
    const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;

    currentQuery =
      getMonthQuery(currentYear, currentMonth) + `&groupBy=${groupBy}`;
    previousQuery =
      getMonthQuery(previousYear, previousMonth) + `&groupBy=${groupBy}`;
  } else if (groupBy === "year") {
    const currentYear = currentDate.getFullYear();
    const previousYear = currentYear - 1;

    currentQuery = getYearQuery(currentYear) + `&groupBy=${groupBy}`;
    previousQuery = getYearQuery(previousYear) + `&groupBy=${groupBy}`;
  } else {
    currentQuery = `startDate=${formatDate(currentDate)}&endDate=${formatDate(
      currentDate
    )}`;
    previousQuery = `startDate=${formatDate(previousDate)}&endDate=${formatDate(
      previousDate
    )}`;
  }

  if (findMany) {
    currentQuery = "sortBy=id&sortOrder=asc";
  }

  const { data: currentData } = useAxiosFetch(`/sales?${currentQuery}`);
  const { data: previousData } = useAxiosFetch(`/sales?${previousQuery}`);

  return { currentData, previousData };
};

export default useSale;
