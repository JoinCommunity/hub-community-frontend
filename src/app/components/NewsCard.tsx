import { Badge } from "./ui/badge";

interface NewsCardProps {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
}

export const NewsCard = ({
  title,
  description,
  date,
  category,
  readTime,
  image,
}: NewsCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Imagem da Notícia */}
      <img src={image} alt={title} className="w-full h-48 object-cover" />

      {/* Detalhes da Notícia */}
      <div className="p-6">
        {/* Categoria */}
        <Badge variant="secondary" className="mb-2">
          {category}
        </Badge>

        {/* Título */}
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>

        {/* Descrição */}
        <p className="text-gray-600 mb-4">{description}</p>

        {/* Informações Adicionais */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>{date}</span>
          <span>•</span>
          <span>{readTime} de leitura</span>
        </div>
      </div>
    </div>
  );
};