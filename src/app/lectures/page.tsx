"use client";

import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/AppSidebar";
import { Badge } from "../components/ui/badge";
import { Clock, Play, User } from "lucide-react";
import { motion } from "framer-motion";
import { lectures } from "../data/palestras";
import { useIsMobile } from "@/app/hooks/isMobile";

const Lectures = () => {
  const isMobile = useIsMobile();
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className={`flex-1 p-8 ${isMobile ? "pb-24" : ""}`}>
          <div className="max-w-7xl mx-auto">
            <header className="mb-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Palestras Online
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Palestras
              </h1>
              <p className="text-xl text-gray-600">
                Assista palestras técnicas e expanda seu conhecimento
              </p>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lectures.map((lecture, index) => (
                <motion.div
                  key={lecture.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden group"
                >
                  <div className="relative">
                    <img
                      src={lecture.thumbnail}
                      alt={lecture.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play size={48} className="text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {lecture.tags.map((tag) => (
                        <Badge key={tag} className="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {lecture.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{lecture.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        <div>
                          <p className="font-medium">{lecture.speaker}</p>
                          <p className="text-xs">{lecture.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{lecture.duration}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Lectures;
