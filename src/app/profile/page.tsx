"use client";
import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/AppSidebar";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase"; // Importe o cliente Supabase
import { useAuth } from "@/app/context/auth-context"; // Importe o contexto de autenticação

// Componente principal
const Profile = () => {
  const [user, setUser] = useState<{
    full_name?: string;
    email?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isAuthenticated) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const { data: sessionData, error } = await supabase.auth.getUser();

        if (error) {
          console.error("Erro ao buscar dados do usuário:", error.message);
          setUser(null);
        } else {
          const userData = sessionData?.user;
          setUser({
            full_name: userData?.user_metadata?.full_name || "Usuário",
            email: userData?.email || "Email não disponível",
          });
        }
      } catch (err) {
        console.error("Erro ao buscar dados do usuário:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Você precisa estar logado para ver esta página.
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              {/* Header/Cover */}
              <div className="h-48 relative bg-gray-200">
                {/* Placeholder para capa */}
              </div>
              {/* Profile Info */}
              <div className="px-8 pb-8">
                <div className="flex flex-col md:flex-row gap-6 -mt-24">
                  {/* Avatar */}
                  <div className="flex-shrink-0 flex flex-col items-start">
                    <div className="w-32 h-32 rounded-xl border-4 border-white shadow-sm bg-gray-300 object-cover relative z-10" />
                    <div className="mt-4 text-left">
                      <h1 className="text-xl font-bold text-gray-900">
                        {user.full_name}
                      </h1>
                      <p className="text-gray-600">{user.email}</p>
                    </div>
                  </div>
                </div>
                {/* Bio */}
                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-2">Sobre</h2>
                  <p className="text-gray-600">
                    Informações adicionais ainda não estão disponíveis.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Profile;
