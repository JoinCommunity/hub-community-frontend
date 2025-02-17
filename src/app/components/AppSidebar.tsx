import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Home,
  Users,
  Calendar,
  Newspaper,
  Video,
  LogIn,
  UserCircle,
  Plus,
  Settings,
  LogOut,
} from "lucide-react";
import { useIsMobile } from "@/app/hooks/isMobile";
import { useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar";
import { useAuth } from "@/app/context/auth-context"; // Importe o contexto de autenticação

// Dados dos itens do menu
const menuItems = [
  { title: "Início", icon: Home, url: "/" },
  { title: "Comunidades", icon: Users, url: "/communities" },
  { title: "Eventos", icon: Calendar, url: "/events" },
  { title: "Notícias", icon: Newspaper, url: "/news" },
  { title: "Palestras", icon: Video, url: "/lectures" },
];

const additionalItems = [
  { title: "Criar Comunidade", icon: Plus, url: "/communities/create" },
  {
    title: "Gerenciar Comunidades",
    icon: Settings,
    url: "/communities/manage",
  },
];

// Componente principal
export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMobile = useIsMobile();
  const { isAuthenticated, logout } = useAuth(); // Hook para verificar autenticação
  const router = useRouter();

  // Função para realizar o logout
  const handleLogout = () => {
    logout(); // Chama a função de logout do contexto
    router.push("/"); // Redireciona para a página inicial
  };

  // Renderiza o menu lateral para desktop
  const renderDesktopSidebar = () => (
    <Sidebar
      className={`border-r border-gray-200 bg-gradient-to-b from-white to-gray-50 transition-all duration-300 ${
        isCollapsed ? "w-[80px]" : "w-[240px]"
      }`}
    >
      {/* Header */}
      <div className="flex h-14 items-center justify-between px-4 border-b border-gray-200 bg-gradient-to-r from-primary/10 to-transparent">
        <h2
          className={`font-semibold text-primary ${
            isCollapsed ? "hidden" : "block"
          }`}
        >
          HubVerso
        </h2>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="px-4 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label={isCollapsed ? "Expandir menu" : "Recolher menu"}
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>
      {/* Conteúdo do menu */}
      <SidebarContent>
        {/* Itens principais */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center gap-3 px-6 py-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <item.icon size={20} className="text-primary" />
                      <span className={`${isCollapsed ? "hidden" : "block"}`}>
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* Gerenciamento */}
        {isAuthenticated && (
          <SidebarGroup>
            <SidebarGroupLabel
              className={`${
                isCollapsed ? "hidden" : "block"
              } px-4 py-2 text-xs font-medium text-gray-500`}
            >
              Gerenciamento
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {additionalItems.slice(0, 2).map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className="flex items-center gap-3 px-6 py-2 hover:bg-gray-100 rounded-lg transition-colors text-primary"
                      >
                        <item.icon size={20} />
                        <span className={`${isCollapsed ? "hidden" : "block"}`}>
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        {/* Itens inferiores */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Condicional para exibir "Entrar" ou "Sair" */}
              {isAuthenticated ? (
                <>
                  {/* Perfil */}
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-6 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <UserCircle size={20} className="text-primary" />
                        <span className={`${isCollapsed ? "hidden" : "block"}`}>
                          Perfil
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  {/* Sair */}
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-6 py-2 hover:bg-gray-100 rounded-lg transition-colors w-full text-left"
                      >
                        <LogOut size={20} className="text-primary" />
                        <span className={`${isCollapsed ? "hidden" : "block"}`}>
                          Sair
                        </span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      href="/login"
                      className="flex items-center gap-3 px-6 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <LogIn size={20} className="text-primary" />
                      <span className={`${isCollapsed ? "hidden" : "block"}`}>
                        Entrar
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );

  // Renderiza o menu inferior para mobile
  const renderMobileNavbar = () => (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-white to-gray-50 border-t border-gray-200 z-50 backdrop-blur-sm">
      <div className="flex justify-around items-center h-16 px-4">
        {menuItems.map((item) => (
          <Link
            key={item.title}
            href={item.url}
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary transition-colors"
            aria-label={item.title}
          >
            <item.icon size={20} />
            <span className="text-xs">{item.title}</span>
          </Link>
        ))}
        {/* Dropdown Button */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary transition-colors"
            aria-label="Mais opções"
          >
            <Menu size={20} />
            <span className="text-xs">Mais</span>
          </button>
          {isDropdownOpen && (
            <div
              className="absolute bottom-full right-0 mb-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden"
              style={{ minWidth: "max-content" }}
            >
              {/* Condicional para exibir "Criar Comunidade" e "Gerenciar Comunidades" */}
              {isAuthenticated &&
                additionalItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.url}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    aria-label={item.title}
                  >
                    <item.icon size={16} />
                    <span>{item.title}</span>
                  </Link>
                ))}
              {/* Condicional para exibir "Entrar" ou "Sair" */}
              {isAuthenticated ? (
                <>
                  {/* Perfil */}
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <UserCircle size={16} />
                    <span>Perfil</span>
                  </Link>
                  {/* Sair */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors w-full text-left"
                  >
                    <LogOut size={16} />
                    <span>Sair</span>
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  aria-label="Entrar"
                >
                  <LogIn size={16} />
                  <span>Entrar</span>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );

  return isMobile ? renderMobileNavbar() : renderDesktopSidebar();
}
