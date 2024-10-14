import { SearchIcon } from "lucide-react";
import React from "react";

export default function Searchbar() {
  return (
    <div className="bg-primary-300 rounded-2xl w-[512px] h-14 px-6 py-[2px] flex items-center">
      <SearchIcon className="text-primary-900 mr-2" strokeWidth={3}/>
      <input type="text" placeholder="Search here..." className="w-full bg-primary-300 focus:outline-none text-lg placeholder:text-lg"/>
    </div>
  )
}