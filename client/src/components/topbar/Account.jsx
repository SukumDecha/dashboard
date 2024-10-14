import { ChevronDown } from "lucide-react";
import React from "react";

export default function Account() {
  return (
    <div className="h-14 flex gap-5 w-[226px] items-center">
      {/* Profile picture dummy */}
      <div className="h-14 w-14 rounded-2xl bg-primary-200"></div>
      
      <div className="flex-grow flex flex-col">
        <div className="flex justify-between">
          <div className="font-medium">Musfiq</div>
          <ChevronDown />
        </div>
        <div className="text-gray-500 text-sm">
          Admin
        </div>
      </div>

    </div>
  )
}