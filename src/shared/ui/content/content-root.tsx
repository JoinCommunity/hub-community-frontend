import { motion } from "framer-motion";
import { ReactNode } from "react";
import Utils from "src/shared/utils/utils";

interface ContentGroupProps {
  className?: string;
  children: ReactNode;
}

export default function ContentGroup({
  className,
  children,
}: ContentGroupProps) {
  return (
    <div className="text-secondary-50 border-gray w-full px-10 py-9">
      <motion.div
        className={Utils.cn("mx-auto flex flex-1 gap-4", className)}
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
