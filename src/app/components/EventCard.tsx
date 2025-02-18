import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Badge } from "./ui/badge";

interface EventCardProps {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  time: string;
  attendees: number;
  tags: string[];
  image: string;
}

export const EventCard = ({
  title,
  description,
  date,
  location,
  time,
  attendees,
  tags,
  image,
}: EventCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Imagem do Evento */}
      <img src={image} alt={title} className="w-full h-48 object-cover" />

      {/* Detalhes do Evento */}
      <div className="p-6">
        {/* Título */}
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>

        {/* Descrição */}
        <p className="text-gray-600 mb-4">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Informações Adicionais */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={18} />
            <span>{attendees} participantes</span>
          </div>
        </div>
      </div>
    </div>
  );
};
