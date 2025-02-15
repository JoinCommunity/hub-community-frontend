"use client";

import { Calendar, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/app/hooks/isMobile";

interface CommunityCardProps {
  name: string;
  description: string;
  members: number;
  events: number;
  image: string;
}

export function CommunityCard({
  name,
  description,
  members,
  events,
  image,
}: CommunityCardProps) {
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg"
    >
      <motion.div
        className={`relative ${isMobile ? "h-36" : "h-48"} overflow-hidden`}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </motion.div>
      <div className={`${isMobile ? "p-4" : "p-6"}`}>
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`${
            isMobile ? "text-lg" : "text-xl"
          } font-semibold text-gray-900 mb-2`}
        >
          {name}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`text-gray-600 mb-4 line-clamp-2 ${
            isMobile ? "text-sm" : "text-base"
          }`}
        >
          {description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`flex items-center justify-between ${
            isMobile ? "text-xs" : "text-sm"
          } text-gray-500`}
        >
          <div className="flex items-center gap-1.5">
            <Users size={isMobile ? 14 : 16} className="text-primary" />
            <span>{members} membros</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={isMobile ? 14 : 16} className="text-primary" />
            <span>{events} eventos</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
