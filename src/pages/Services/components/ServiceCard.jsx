import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const ServiceCard = ({ service, isActive, onActivate, index = 0 }) => (
  <motion.button
    onClick={onActivate}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.08 }}
    whileHover={{ y: -3 }}
    whileTap={{ scale: 0.97 }}
    className={`flex items-center gap-3 px-5 py-3 rounded-2xl border-2 font-medium text-sm transition-all duration-300 whitespace-nowrap
      ${isActive
        ? "bg-primary border-primary text-white shadow-lg glow-orange"
        : "bg-white border-gray-200 text-secondary hover:border-primary/40 hover:shadow-md"}`}
  >
    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${isActive ? "bg-white/20" : "bg-gray-100"}`}>
      <Icon name={service?.icon || "Code"} size={16} color={isActive ? "white" : "#6B7280"} />
    </div>
    <span>{service?.title}</span>
    {isActive && <Icon name="ChevronDown" size={14} color="white" />}
  </motion.button>
);

export default ServiceCard;
