"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { motion } from "framer-motion";
import { Users, Upload } from "lucide-react";
import { useIsMobile } from "@/app/hooks/isMobile";
import { AuthWrapper } from "@/app/components/AuthWrapper";
import { supabase } from "@/app/lib/supabase";
import { SidebarProvider } from "@/app/components/ui/sidebar";
import { AppSidebar } from "@/app/components/AppSidebar";

// Lista de tags disponíveis
const availableTags = [
  "React",
  "Front-end",
  "Back-end",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Python",
  "Devops",
  "Mobile",
  "Design",
];

// Interface para tipagem do formulário
interface CommunityForm {
  name: string;
  description: string;
  tags: string[];
  image: File | null;
  image_url?: string | null;
  location: string;
}

const CreateCommunity = () => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const [formState, setFormState] = useState<CommunityForm>({
    name: "",
    description: "",
    tags: [],
    image: null,
    location: "",
  });
  const [isUploading, setIsUploading] = useState(false);

  // Função para lidar com o upload de imagem
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setFormState((prevState) => ({ ...prevState, image: file }));

      const { data, error } = await supabase.storage
        .from("community-images")
        .upload(`public/${file.name}`, file);

      if (error) {
        console.error("Erro ao fazer upload da imagem:", error);
        setIsUploading(false);
        return;
      }

      const imageUrl = supabase.storage
        .from("community-images")
        .getPublicUrl(data.path).data.publicUrl;

      setFormState((prevState) => ({
        ...prevState,
        image: file,
        image_url: imageUrl,
      }));
      setIsUploading(false);
    }
  };

  // Função para adicionar/remover tags
  const toggleTag = (tag: string) => {
    setFormState((prevState) => {
      const newTags = prevState.tags.includes(tag)
        ? prevState.tags.filter((t) => t !== tag)
        : [...prevState.tags, tag];
      return { ...prevState, tags: newTags };
    });
  };

  // Função para enviar o formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Usar a URL da imagem que já foi feito upload anteriormente
    const imageUrl = formState.image_url;

    // Obtenha o token JWT do Supabase Auth
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const jwtToken = session?.access_token;

    if (!jwtToken) {
      alert("Você precisa estar logado para criar uma comunidade.");
      return;
    }

    const response = await fetch("/api/create-community", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        name: formState.name,
        description: formState.description,
        tags: formState.tags,
        location: formState.location,
        image_url: formState.image_url,
      }),
    });

    if (response.ok) {
      alert("Comunidade criada com sucesso!");
      router.push("/communities");
    } else {
      const errorData = await response.json();
      alert(`Erro ao criar comunidade: ${errorData.error}`);
    }
  };

  return (
    <>
      <AuthWrapper>
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
                    <h1 className="text-2xl font-bold">
                      Criar Nova Comunidade
                    </h1>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Nome */}
                    <div>
                      <Label htmlFor="name">Nome da Comunidade</Label>
                      <Input
                        id="name"
                        placeholder="Ex: React Brasil"
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        required
                      />
                    </div>

                    {/* Descrição */}
                    <div>
                      <Label htmlFor="description">Descrição</Label>
                      <textarea
                        id="description"
                        placeholder="Descreva o propósito e objetivos da sua comunidade"
                        value={formState.description}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            description: e.target.value,
                          })
                        }
                        className="w-full h-32 p-2 border rounded-md resize-none"
                        required
                      />
                    </div>

                    {/* Tags */}
                    <div>
                      <Label>Tags</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {availableTags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => toggleTag(tag)}
                            className={`px-3 py-1 rounded-full text-sm transition-all ${
                              formState.tags.includes(tag)
                                ? "bg-primary text-white shadow-md"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Localização */}
                    <div>
                      <Label htmlFor="location">Localização</Label>
                      <Input
                        id="location"
                        placeholder="Ex: São Paulo, Brasil"
                        value={formState.location}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            location: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Upload de Imagem */}
                    <div>
                      <Label>Imagem da Comunidade</Label>
                      <label
                        htmlFor="image-upload"
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary transition-colors duration-300"
                      >
                        <Upload className="h-8 w-8 text-gray-400" />
                        <div className="text-sm text-gray-600 text-center">
                          <span className="text-primary font-medium">
                            Clique para upload
                          </span>{" "}
                          ou arraste e solte
                        </div>
                        <div className="text-xs text-gray-400 text-center">
                          PNG, JPG ou GIF (máximo 2MB)
                        </div>
                      </label>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/png, image/jpeg, image/gif"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      {isUploading && (
                        <p className="text-sm text-gray-600 mt-2">
                          Carregando imagem...
                        </p>
                      )}
                      {formState.image && (
                        <p className="text-sm text-gray-600 mt-2">
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
      </AuthWrapper>
    </>
  );
};

export default CreateCommunity;
