import { Badge } from "./ui/badge";

interface LectureCardProps {
  id: number;
  title: string;
  description: string;
  duration: string;
  speaker: string;
  role: string;
  tags: string[];
  thumbnail: string;
}

export const LectureCard = ({
  title,
  description,
  duration,
  speaker,
  role,
  tags,
  thumbnail,
}: LectureCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Thumbnail da Palestra */}
      <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />

      {/* Detalhes da Palestra */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span>{speaker}</span>
            <span>•</span>
            <span>{role}</span>
          </div>
          <div className="flex items-center justify-end md:justify-start gap-2">
            <span>{duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
