import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFilter } from "../../hooks/useFilter";

const CustomDatePicker = () => {
  const { selectedDate, updateSelectedDate } = useFilter();

  return (
    <div className="flex items-center justify-center">
      <DatePicker
        selected={selectedDate}
        onSelect={(date) =>
          updateSelectedDate(date.toISOString().split("T")[0])
        }
        className="p-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholderText="Click to select a date"
      />
    </div>
  );
};

export default CustomDatePicker;
