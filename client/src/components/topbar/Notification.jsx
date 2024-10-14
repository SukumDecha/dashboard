import React, { useState } from "react";
import {Bell} from 'lucide-react';

export default function Notification() {

  const [hasNotification, setNotification] = useState(true); 
  
  return (
    <div onClick={() => setNotification(!hasNotification)} className="w-12 h-12 relative bg-yellow-100 rounded-lg">
      <div className={`bg-[#EB5757] w-2 h-2 rounded-full ${hasNotification ? "" : "hidden"} absolute right-1 top-2`}></div>
      <Bell className="absolute translate-x-1/2 translate-y-1/2 text-yellow-600" strokeWidth={2}/>
    </div>
  )
}