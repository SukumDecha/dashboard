import { createContext, useState } from "react";

const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const [groupBy, setGroupBy] = useState("day");
  const [selectedDate, setSelectedDate] = useState("2024-10-04");

  const updateFilterOptions = (options) => {
    setGroupBy(options);
  };

  const updateSelectedDate = (date) => {
    setSelectedDate(date);
  };

  return (
    <FilterContext.Provider
      value={{
        groupBy,
        selectedDate,
        updateFilterOptions,
        updateSelectedDate,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export { FilterProvider, FilterContext };
