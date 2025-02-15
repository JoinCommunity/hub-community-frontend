"use client";

import { SidebarProvider } from "@/app/components/ui/sidebar";
import { AppSidebar } from "@/app/components/AppSidebar";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { motion } from "framer-motion";
import { Users, Upload, Tag } from "lucide-react";

const CreateCommunity = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <div className="flex items-center gap-2 text-primary mb-6">
                <Users size={24} />
                <h1 className="text-2xl font-bold">Criar Nova Comunidade</h1>
              </div>

              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da Comunidade</Label>
                  <Input id="name" placeholder="Ex: React Brasil" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva o propósito e objetivos da sua comunidade"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="Ex: react, frontend, javascript (separadas por vírgula)"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Imagem da Comunidade</Label>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-gray-400" />
                      <div className="text-sm text-gray-600">
                        <span className="text-primary font-medium">
                          Clique para upload
                        </span>{" "}
                        ou arraste e solte
                      </div>
                      <div className="text-xs text-gray-400">
                        PNG, JPG ou GIF (max. 2MB)
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="w-full">Criar Comunidade</Button>
              </form>
            </motion.div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CreateCommunity;
