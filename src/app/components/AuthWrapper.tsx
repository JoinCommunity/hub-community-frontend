// components/AuthWrapper.tsx
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/app/context/auth-context";

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Verifica a autenticação assim que o componente é montado
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login"); // Redireciona para a página de login
    }
  }, [isAuthenticated, router]);

  // Se o usuário não estiver autenticado, não renderiza os filhos
  if (!isAuthenticated) {
    return null;
  }

  // Renderiza os filhos se o usuário estiver autenticado
  return <>{children}</>;
};