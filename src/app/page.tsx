"use client";

import { useState, useEffect } from "react";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { CommunityCard } from "./components/CommunityCard";
import { mockCommunities } from "./data/comunidadesDestaque";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const MOBILE_BREAKPOINT = 768;

    // Usar matchMedia para melhor performance e compatibilidade
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const handleChange = () => {
      setIsMobile(mql.matches);
    };

    // Definir estado inicial
    setIsMobile(mql.matches);

    // Usar o event listener do matchMedia
    mql.addEventListener("change", handleChange);

    // Cleanup
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
}

const Index = () => {
  const isMobile = useIsMobile();
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className={`flex-1 ${isMobile ? "p-4 pb-24" : "p-8"}`}>
          <div className="max-w-7xl mx-auto">
            <header className={`${isMobile ? "mb-6" : "mb-12"}`}>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Comunidades em Destaque
              </div>
              <h1
                className={`${
                  isMobile ? "text-2xl" : "text-4xl"
                } font-bold text-gray-900 mb-2`}
              >
                Explore as Comunidades em Destaque
              </h1>
              <p
                className={`${
                  isMobile ? "text-base" : "text-xl"
                } text-gray-600`}
              >
                Conecte-se com desenvolvedores, participe de eventos e
                compartilhe conhecimento
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {mockCommunities.map((community) => (
                <CommunityCard key={community.name} {...community} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
