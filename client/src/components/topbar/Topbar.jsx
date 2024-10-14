import Searchbar from "./Searchbar";
import ChangeLangBtn from "./ChangeLangBtn";
import Notification from "./Notification";
import Account from "./Account";
import CustomDatePicker from "./FilterBtn";

export default function Topbar() {
  return (
    <div className="w-full flex-grow px-10 py-9 flex justify-between items-center bg-[#fff]">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <Searchbar />
      <div className="flex gap-6">
        <CustomDatePicker />
        <ChangeLangBtn />
        <Notification />
        <Account />
      </div>
    </div>
  );
}
