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
import { mockUser, User as UserType } from "@/app/data/mockUser";
import { JSX } from "react";
import { useIsMobile } from "@/app/hooks/isMobile";

// Componente para exibir informações rápidas do perfil
const QuickInfo = ({
  email,
  location,
  joinDate,
}: Pick<UserType, "email" | "location" | "joinDate">) => (
  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
    <div className="flex items-center gap-1">
      <Mail size={16} />
      {email}
    </div>
    <div className="flex items-center gap-1">
      <MapPin size={16} />
      {location}
    </div>
    <div className="flex items-center gap-1">
      <Calendar size={16} />
      Membro desde {joinDate}
    </div>
  </div>
);

// Componente para exibir habilidades
const Skills = ({ skills }: { skills: string[] }) => (
  <div className="flex flex-wrap gap-2">
    {skills.map((skill) => (
      <Badge key={skill} variant="secondary">
        {skill}
      </Badge>
    ))}
  </div>
);

// Componente para estatísticas
const Stats = ({ stats }: { stats: UserType["stats"] }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <StatCard
      icon={<Users size={20} />}
      label="Comunidades"
      value={stats.communities}
    />
    <StatCard
      icon={<Calendar size={20} />}
      label="Eventos"
      value={stats.events}
    />
    <StatCard
      icon={<BookOpen size={20} />}
      label="Contribuições"
      value={stats.contributions}
    />
  </div>
);

// Componente individual para cada estatística
const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: JSX.Element;
  label: string;
  value: number;
}) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <div className="flex items-center gap-2 text-primary mb-2">
      {icon}
      <span className="font-semibold">{label}</span>
    </div>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

// Componente para links sociais
const SocialLinks = ({ social }: { social: UserType["social"] }) => (
  <div className="flex flex-wrap gap-4">
    {social.github && (
      <SocialLink
        href={`https://${social.github}`}
        icon={<Github size={20} />}
        label="GitHub"
      />
    )}
    {social.linkedin && (
      <SocialLink
        href={`https://${social.linkedin}`}
        icon={<Linkedin size={20} />}
        label="LinkedIn"
      />
    )}
    {social.twitter && (
      <SocialLink
        href={`https://twitter.com/${social.twitter}`}
        icon={<Twitter size={20} />}
        label="Twitter"
      />
    )}
    {social.website && (
      <SocialLink
        href={`https://${social.website}`}
        icon={<Globe size={20} />}
        label="Website"
      />
    )}
  </div>
);

// Componente individual para cada link social
const SocialLink = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: JSX.Element;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
  >
    {icon}
    <span>{label}</span>
  </a>
);

// Componente principal
const Profile = () => {
  const user = mockUser;
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className={`flex-1 p-8 ${isMobile ? "pb-24" : ""}`}>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              {/* Header/Cover */}
              <div className="h-48 relative">
                <img
                  src={user.coverImage}
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
                      src={user.avatar}
                      alt={user.name}
                      className="w-32 h-32 rounded-xl border-4 border-white shadow-sm object-cover relative z-10"
                    />
                    <div className="mt-4 text-left">
                      <h1 className="text-xl font-bold text-gray-900">
                        {user.name}
                      </h1>
                      <p className="text-gray-600">{user.role}</p>
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div
                    className={`flex-1 md:pt-6 mt-20 ml-[-20px] ${
                      isMobile ? "mt-4" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <QuickInfo
                        email={user.email}
                        location={user.location}
                        joinDate={user.joinDate}
                      />
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-2">Sobre</h2>
                  <p className="text-gray-600">{user.bio}</p>
                </div>

                {/* Skills */}
                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-3">Habilidades</h2>
                  <Skills skills={user.skills} />
                </div>

                {/* Stats */}
                <Stats stats={user.stats} />

                {/* Social Links */}
                <div className="mt-8">
                  <SocialLinks social={user.social} />
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
