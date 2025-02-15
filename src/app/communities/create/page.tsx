"use client";
import { SidebarProvider } from "@/app/components/ui/sidebar";
import { AppSidebar } from "@/app/components/AppSidebar";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { motion } from "framer-motion";
import { Users, Upload, Tag } from "lucide-react";
import { useIsMobile } from "@/app/hooks/isMobile";
import { useState } from "react";

// Interface para tipagem do formulário
interface CommunityForm {
  name: string;
  description: string;
  tags: string;
  image: File | null;
}

const CreateCommunity = () => {
  const isMobile = useIsMobile();
  const [formState, setFormState] = useState<CommunityForm>({
    name: "",
    description: "",
    tags: "",
    image: null,
  });

  // Função para lidar com o upload de imagem
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormState((prevState) => ({ ...prevState, image: file }));
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className={`flex-1 p-8 ${isMobile ? "pb-24" : ""}`}>
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <div className="flex items-center gap-2 text-primary mb-6">
                <Users size={24} />
                <h1 className="text-2xl font-bold">Criar Nova Comunidade</h1>
              </div>

              <form className="space-y-6">
                {/* Nome da Comunidade */}
                <FormField
                  label="Nome da Comunidade"
                  id="name"
                  placeholder="Ex: React Brasil"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                />

                {/* Descrição */}
                <FormField
                  label="Descrição"
                  id="description"
                  as="textarea"
                  placeholder="Descreva o propósito e objetivos da sua comunidade"
                  value={formState.description}
                  onChange={(e) =>
                    setFormState({ ...formState, description: e.target.value })
                  }
                />

                {/* Tags */}
                <FormField
                  label="Tags"
                  id="tags"
                  placeholder="Ex: react, frontend, javascript (separadas por vírgula)"
                  value={formState.tags}
                  onChange={(e) =>
                    setFormState({ ...formState, tags: e.target.value })
                  }
                />

                {/* Upload de Imagem */}
                <div className="space-y-2">
                  <Label>Imagem da Comunidade</Label>
                  <ImageUpload onUpload={handleImageUpload} />
                  {formState.image && (
                    <p className="text-sm text-gray-600">
                      Arquivo selecionado: {formState.image.name}
                    </p>
                  )}
                </div>

                {/* Botão de Envio */}
                <Button type="submit" className="w-full">
                  Criar Comunidade
                </Button>
              </form>
            </motion.div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

// Componente reutilizável para campos de formulário
const FormField = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  as = "input",
}: {
  label: string;
  id: string;
  placeholder?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  as?: "input" | "textarea";
}) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    {as === "textarea" ? (
      <Textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="min-h-[100px]"
      />
    ) : (
      <Input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    )}
  </div>
);

// Componente para upload de imagem
const ImageUpload = ({
  onUpload,
}: {
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <label
    htmlFor="image-upload"
    className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary transition-colors duration-300"
    style={{ minHeight: "150px" }} // Altura mínima para garantir consistência
  >
    {/* Ícone de Upload */}
    <Upload className="h-8 w-8 text-gray-400" />

    {/* Texto Principal */}
    <div className="text-sm text-gray-600 text-center">
      <span className="text-primary font-medium">Clique para upload</span> ou
      arraste e solte
    </div>

    {/* Informações Adicionais */}
    <div className="text-xs text-gray-400 text-center">
      PNG, JPG ou GIF (máximo 2MB)
    </div>

    {/* Input Oculto para Upload */}
    <input
      id="image-upload"
      type="file"
      accept="image/png, image/jpeg, image/gif"
      className="hidden"
      onChange={onUpload}
    />
  </label>
);

export default CreateCommunity;
