"use client";

import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/AppSidebar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { motion } from "framer-motion";
import Link from "next/link";
import { KeyRound } from "lucide-react";

const ResetPassword = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <div className="flex items-center gap-2 text-primary mb-6">
                <KeyRound size={24} />
                <h1 className="text-2xl font-bold">Resetar Senha</h1>
              </div>

              <p className="text-gray-600 mb-6">
                Digite seu email e enviaremos instruções para resetar sua senha.
              </p>

              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" />
                </div>

                <Button className="w-full">Enviar instruções</Button>

                <p className="text-center text-sm text-gray-500">
                  Lembrou sua senha?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Voltar ao login
                  </Link>
                </p>
              </form>
            </motion.div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ResetPassword;
