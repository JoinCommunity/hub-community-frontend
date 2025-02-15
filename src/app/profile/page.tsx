"use client";

import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/AppSidebar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Edit,
  BookOpen,
  Users,
  Award,
} from "lucide-react";
import { mockUser } from "@/app/data/mockUser";

const Profile = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              {/* Header/Cover */}
              <div className="h-48 relative">
                <img
                  src={mockUser.coverImage}
                  alt="Cover"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* Profile Info */}
              <div className="px-8 pb-8">
                <div className="flex flex-col md:flex-row gap-6 -mt-24">
                  {/* Avatar */}
                  <div className="flex-shrink-0 flex flex-col items-start">
                    <img
                      src={mockUser.avatar}
                      alt={mockUser.name}
                      className="w-32 h-32 rounded-xl border-4 border-white shadow-sm object-cover relative z-10"
                    />
                    {/* Basic Info */}
                    <div className="mt-4 text-left">
                      <h1 className="text-xl font-bold text-gray-900">
                        {mockUser.name}
                      </h1>
                      <p className="text-gray-600">{mockUser.role}</p>
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="flex-1 md:pt-6 mt-20 ml-[-20px]">
                    <div className="flex items-start justify-between">
                      <div>
                        {/* Quick Info */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Mail size={16} />
                            {mockUser.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            {mockUser.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            Membro desde {mockUser.joinDate}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Edit size={16} />
                        Editar Perfil
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-2">Sobre</h2>
                  <p className="text-gray-600">{mockUser.bio}</p>
                </div>

                {/* Skills */}
                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-3">Habilidades</h2>
                  <div className="flex flex-wrap gap-2">
                    {mockUser.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Users size={20} />
                      <span className="font-semibold">Comunidades</span>
                    </div>
                    <p className="text-2xl font-bold">
                      {mockUser.stats.communities}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Calendar size={20} />
                      <span className="font-semibold">Eventos</span>
                    </div>
                    <p className="text-2xl font-bold">
                      {mockUser.stats.events}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <BookOpen size={20} />
                      <span className="font-semibold">Contribuições</span>
                    </div>
                    <p className="text-2xl font-bold">
                      {mockUser.stats.contributions}
                    </p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href={`https://${mockUser.social.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
                  >
                    <Github size={20} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={`https://${mockUser.social.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
                  >
                    <Linkedin size={20} />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={`https://twitter.com/${mockUser.social.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
                  >
                    <Twitter size={20} />
                    <span>Twitter</span>
                  </a>
                  <a
                    href={`https://${mockUser.social.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
                  >
                    <Globe size={20} />
                    <span>Website</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Profile;
