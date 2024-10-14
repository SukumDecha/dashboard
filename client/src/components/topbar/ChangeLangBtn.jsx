import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

const Languages = {
  ENG_US: "ENG (US)",
  TH: "TH"
}

export default function ChangeLangBtn() {

  const [selectedLang, setLang] = useState(Languages.ENG_US);
  
  return (
    <div className="flex items-center gap-3 mr-[18px]">
      {/* Dummy Language Icon */}
      <div className="w-6 h-6 bg-primary-200 rounded-full"></div>
      <div className="text-lg font-semibold">{selectedLang}</div>
      <ChevronDown className="text-gray-500"/>
    </div>
  )
}