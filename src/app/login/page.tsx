"use client";
import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/AppSidebar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { motion } from "framer-motion";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/app/lib/supabase"; // Importe o cliente Supabase
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth-context"; // Importe o contexto de autenticação

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login: authLogin } = useAuth(); // Função de login do contexto

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { email, password } = formData;

    // Validações básicas
    if (!email || !password) {
      setError("Todos os campos são obrigatórios.");
      setLoading(false);
      return;
    }

    try {
      // Autenticar usuário no Supabase
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) {
        setError(loginError.message);
        setLoading(false);
        return;
      }

      // Atualizar o estado de autenticação no contexto
      authLogin();

      // Redirecionar para a página inicial após o login
      router.push("/");
    } catch (err) {
      setError("Ocorreu um erro ao fazer login. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-md mx-auto mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <div className="flex items-center gap-2 text-primary mb-6">
                <LogIn size={24} />
                <h1 className="text-2xl font-bold">Login</h1>
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Link
                    href="/reset-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Carregando..." : "Entrar"}
                </Button>
                <p className="text-center text-sm text-gray-500">
                  Não tem uma conta?{" "}
                  <Link
                    href="/register"
                    className="text-primary hover:underline"
                  >
                    Registre-se
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

export default Login;
