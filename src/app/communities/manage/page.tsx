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
import { useIsMobile } from "@/app/hooks/isMobile";
import { useState } from "react";

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
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<
    (typeof communities)[number] | null
  >(null);

  // Funções para abrir e fechar modais
  const openEditModal = (community: any) => {
    setSelectedCommunity(community);
    setEditModalOpen(true);
  };

  const openDeleteModal = (community: any) => {
    setSelectedCommunity(community);
    setDeleteModalOpen(true);
  };

  const closeModals = () => {
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedCommunity(null);
  };

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
                        className="h-48 w-full object-cover md:h-full"
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
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => openEditModal(community)}
                          >
                            <Edit size={16} />
                            Editar
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="gap-2"
                            onClick={() => openDeleteModal(community)}
                          >
                            <Trash2 size={16} />
                            Excluir
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Modal de Edição */}
          {editModalOpen && selectedCommunity && (
            <Modal
              title="Editar Comunidade"
              onClose={closeModals}
              actionLabel="Salvar Alterações"
              onAction={() => {
                console.log("Salvar alterações:", selectedCommunity);
                closeModals();
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nome da Comunidade
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedCommunity.name}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Descrição
                  </label>
                  <textarea
                    defaultValue={selectedCommunity.description}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>
            </Modal>
          )}

          {/* Modal de Exclusão */}
          {deleteModalOpen && selectedCommunity && (
            <Modal
              title="Excluir Comunidade"
              onClose={closeModals}
              actionLabel="Excluir"
              onAction={() => {
                console.log("Comunidade excluída:", selectedCommunity);
                closeModals();
              }}
            >
              <p className="text-gray-700">
                Tem certeza de que deseja excluir a comunidade{" "}
                <strong>{selectedCommunity.name}</strong>? Esta ação não pode
                ser desfeita.
              </p>
            </Modal>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
};

// Componente de Modal Reutilizável
interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  actionLabel: string;
  onAction: () => void;
}
const Modal = ({
  title,
  children,
  onClose,
  actionLabel,
  onAction,
}: ModalProps) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        aria-label="Fechar modal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
      <div className="flex justify-end gap-2 mt-6">
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={onAction}>{actionLabel}</Button>
      </div>
    </div>
  </div>
);

export default ManageCommunities;
