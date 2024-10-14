/* eslint-disable react/prop-types */
import React from "react";
import { motion } from "framer-motion";

function SideMenuItem({ id, isFocused, onClick, icon, label }) {
  const menuItemVariants = {
    visible: {
      color: "#737791",
      backgroundColor: "#FFF",
      fontWeight: "400",
    },
    focused: {
      color: "#FFF",
      backgroundColor: "#5D5FEF",
      fontWeight: "600",
    },
  };

  return (
    <motion.div
      variants={menuItemVariants}
      initial="visible"
      onClick={() => onClick(id)}
      animate={isFocused ? "focused" : "visible"}
      className="flex items-center gap-8 px-6 py-4 cursor-pointer rounded-2xl"
    >
      <div className="w-8 h-8">{icon}</div>
      <div className="text-lg">{label}</div>
    </motion.div>
  );
}

export default React.memo(SideMenuItem);
