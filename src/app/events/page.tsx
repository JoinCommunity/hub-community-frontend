"use client";
import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/AppSidebar";
import { Badge } from "../components/ui/badge";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";
import { events, Event as EventType } from "@/app/data/eventos";
import { useIsMobile } from "@/app/hooks/isMobile";
import { JSX } from "react";

// Componente principal
const Events = () => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className={`flex-1 p-8 ${isMobile ? "pb-24" : ""}`}>
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <header className="mb-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Próximos Eventos
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Eventos</h1>
              <p className="text-xl text-gray-600">
                Confira os próximos eventos da comunidade
              </p>
            </header>

            {/* Lista de Eventos */}
            <div className="grid gap-6">
              {events.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Events;

// Componente de Cartão de Evento
const EventCard = ({ event, index }: { event: EventType; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-white rounded-xl shadow-sm overflow-hidden"
  >
    <div className="md:flex">
      {/* Imagem do Evento */}
      <div className="md:w-1/3">
        <img
          src={event.image}
          alt={event.title}
          className="h-48 w-full object-cover md:h-full"
        />
      </div>

      {/* Detalhes do Evento */}
      <div className="p-6 md:w-2/3">
        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags.map((tag: any) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h2>
        <p className="text-gray-600 mb-4">{event.description}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <EventDetail icon={<Calendar size={18} />} text={event.date} />
          <EventDetail icon={<Clock size={18} />} text={event.time} />
          <EventDetail icon={<MapPin size={18} />} text={event.location} />
          {/* <EventDetail
            icon={<Users size={18} />}
            text={`${event.attendees} participantes`}
          />*/}
        </div>
      </div>
    </div>
  </motion.div>
);

// Componente reutilizável para detalhes do evento
const EventDetail = ({ icon, text }: { icon: JSX.Element; text: string }) => (
  <div className="flex items-center gap-2 text-gray-500">
    {icon}
    <span>{text}</span>
  </div>
);
