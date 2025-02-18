"use client";
import { useState, useEffect } from "react";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { CommunityCard } from "./components/CommunityCard";
import { EventCard } from "./components/EventCard";
import { NewsCard } from "./components/NewsCard";
import { LectureCard } from "./components/LectureCard";
import { events } from "./data/eventos";
import { news } from "./data/noticias";
import { lectures } from "./data/palestras";
import { communities } from "./data/comunidades";
import Link from "next/link";
import { useIsMobile } from "@/app/hooks/isMobile";

const Index = () => {
  const isMobile = useIsMobile();

  // Função para limitar a quantidade de itens
  const limitItems = (items: any[], limit: number) => items.slice(0, limit);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className={`flex-1 ${isMobile ? "p-4 pb-24" : "p-8"}`}>
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <header className={`${isMobile ? "mb-6" : "mb-12"}`}>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Inicio
              </div>
              <h1
                className={`${
                  isMobile ? "text-2xl" : "text-4xl"
                } font-bold text-gray-900 mb-2`}
              >
                Bem vindo ao Hubverso
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

            {/* Comunidades em Destaque */}
            <section className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2
                  className={`${
                    isMobile ? "text-xl" : "text-3xl"
                  } font-bold text-gray-900`}
                >
                  Comunidades em Destaque
                </h2>
                <Link
                  href="/communities"
                  className="text-primary hover:underline"
                >
                  Ver mais
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {limitItems(communities, 3).map((community) => (
                  <CommunityCard key={community.name} {...community} />
                ))}
              </div>
            </section>

            {/* Próximos Eventos */}
            <section className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2
                  className={`${
                    isMobile ? "text-xl" : "text-3xl"
                  } font-bold text-gray-900`}
                >
                  Próximos Eventos
                </h2>
                <Link href="/events" className="text-primary hover:underline">
                  Ver mais
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {limitItems(events, 3).map((event) => (
                  <EventCard key={event.id} {...event} />
                ))}
              </div>
            </section>

            {/* Notícias Mais Recentes */}
            <section className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2
                  className={`${
                    isMobile ? "text-xl" : "text-3xl"
                  } font-bold text-gray-900`}
                >
                  Notícias Mais Recentes
                </h2>
                <Link href="/news" className="text-primary hover:underline">
                  Ver mais
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {limitItems(news, 3).map((article) => (
                  <NewsCard key={article.id} {...article} />
                ))}
              </div>
            </section>

            {/* Palestras Mais Assistidas */}
            <section className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2
                  className={`${
                    isMobile ? "text-xl" : "text-3xl"
                  } font-bold text-gray-900`}
                >
                  Palestras Mais Assistidas
                </h2>
                <Link href="/lectures" className="text-primary hover:underline">
                  Ver mais
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {limitItems(lectures, 3).map((lecture) => (
                  <LectureCard key={lecture.id} {...lecture} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
