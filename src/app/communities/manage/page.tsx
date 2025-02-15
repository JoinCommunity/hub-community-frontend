"use client";

import { SidebarProvider } from "@/app/components/ui/sidebar";
import { AppSidebar } from "@/app/components/AppSidebar";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { motion } from "framer-motion";
import {
  Settings,
  Users,
  MessageCircle,
  Calendar,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useIsMobile } from "@/app/page";

const communities = [
  {
    id: 1,
    name: "React Goiânia",
    description:
      "Somos uma comunidade para todos que promove discussões e disseminação de conhecimento sobre React, React Native, GraphQL, Relay, Flow, Jest, Redux, Flux, Webpack e outras tecnologias do ecossistema React.",
    members: 1000,
    posts: 320,
    events: 8,
    tags: ["React", "Frontend", "JavaScript"],
    image:
      "https://media.licdn.com/dms/image/v2/D4D0BAQGp8ru6awP-AA/company-logo_200_200/company-logo_200_200/0/1728654177809/react_goinia_logo?e=1747872000&v=beta&t=6S-BWB7ZtMjhSyCplp4MRKdU_PmUv1VzB5WVcKIVbxU",
  },
  {
    id: 2,
    name: "AWS User Group Goiânia",
    description:
      "Grupo de usuários AWS em Goiânia, com foco em compartilhar conhecimento e fazer networking.",
    members: 500,
    posts: 245,
    events: 5,
    tags: ["AWS", "Cloud", "Backend"],
    image:
      "https://media.licdn.com/dms/image/v2/D4D0BAQG8i2aYMQNl2A/company-logo_200_200/company-logo_200_200/0/1698517034964/aws_go_logo?e=1747872000&v=beta&t=G6UwqNPbo_h30l-WKXeW1mFKqsvbtH0AyO-eK6919G0",
  },
];

const ManageCommunities = () => {
  const isMobile = useIsMobile();
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className={`flex-1 p-8 ${isMobile ? "pb-24" : ""}`}>
          <div className="max-w-5xl mx-auto">
            <header className="flex items-center justify-between mb-8">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  Gerenciamento
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Minhas Comunidades
                </h1>
              </div>
              <Link href="/communities/create">
                <Button className="gap-2">
                  <Plus size={16} />
                  Nova Comunidade
                </Button>
              </Link>
            </header>

            <div className="space-y-6">
              {communities.map((community, index) => (
                <motion.div
                  key={community.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="md:flex">
                    <div className="md:w-1/4">
                      <img
                        src={community.image}
                        alt={community.name}
                        className="h-48 w-full object-fit md:h-full"
                      />
                    </div>
                    <div className="p-6 md:w-3/4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="text-xl font-bold text-gray-900 mb-2">
                            {community.name}
                          </h2>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {community.tags.map((tag) => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="gap-2">
                            <Edit size={16} />
                            Editar
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="gap-2"
                          >
                            <Trash2 size={16} />
                            Excluir
                          </Button>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">
                        {community.description}
                      </p>

                      <div className="grid grid-cols-3 gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Users size={16} />
                          <span>
                            {community.members.toLocaleString()} membros
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageCircle size={16} />
                          <span>{community.posts} posts</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>{community.events} eventos</span>
                        </div>
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

export default ManageCommunities;
