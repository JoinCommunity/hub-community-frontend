'use client';

import { Calendar, LogOut, Mail, Shield, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAgenda } from '@/contexts/agenda-context';
import { useAuth } from '@/contexts/auth-context';

export default function ProfilePage() {
  const { user, isAuthenticated, signOut, isLoading } = useAuth();
  const { agendas, isLoading: agendasLoading } = useAgenda();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSignOut = () => {
    signOut();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Meu Perfil
            </h1>
            <p className="text-gray-600">Gerencie suas informações pessoais</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Card */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Informações Pessoais
                  </CardTitle>
                  <CardDescription>
                    Suas informações básicas de perfil
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage
                        src={user?.avatar}
                        alt={user?.name || user?.username}
                      />
                      <AvatarFallback className="text-lg">
                        {user?.name
                          ? getInitials(user.name)
                          : user?.username?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {user?.name || 'Usuário'}
                      </h3>
                      <p className="text-gray-600">@{user?.username}</p>
                      <Badge variant="secondary" className="mt-1">
                        <Shield className="h-3 w-3 mr-1" />
                        Membro
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Nome
                      </label>
                      <p className="text-gray-900">
                        {user?.name || 'Não informado'}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Username
                      </label>
                      <p className="text-gray-900">@{user?.username}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <p className="text-gray-900 flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {user?.email}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <Badge
                        variant="outline"
                        className="text-green-600 border-green-600"
                      >
                        Ativo
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Agendas Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Minhas Agendas
                  </CardTitle>
                  <CardDescription>
                    Eventos que você adicionou à sua agenda
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {agendasLoading ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="mt-2 text-sm text-gray-600">
                        Carregando agendas...
                      </p>
                    </div>
                  ) : agendas.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">
                        Nenhuma agenda encontrada
                      </p>
                      <p className="text-sm text-gray-500">
                        Adicione eventos à sua agenda para visualizá-los aqui
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {agendas.slice(0, 5).map(agenda => (
                        <div
                          key={agenda.documentId}
                          className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                            {agenda.event.images &&
                            agenda.event.images.length > 0 ? (
                              <Image
                                src={agenda.event.images[0]}
                                alt={agenda.event.title}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            ) : (
                              <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                                <Calendar className="h-6 w-6 text-gray-600" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 truncate">
                              {agenda.event.title}
                            </h4>
                            <Link
                              href={`/events/${agenda.event.documentId}`}
                              className="text-sm text-blue-600 hover:underline"
                            >
                              Ver detalhes
                            </Link>
                          </div>
                        </div>
                      ))}
                      {agendas.length > 5 && (
                        <div className="text-center pt-2">
                          <p className="text-sm text-gray-500">
                            E mais {agendas.length - 5} evento
                            {agendas.length - 5 > 1 ? 's' : ''}...
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Actions Card */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Ações</CardTitle>
                  <CardDescription>Gerencie sua conta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      /* TODO: Implement edit profile */
                    }}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Editar Perfil
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      /* TODO: Implement settings */
                    }}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Configurações
                  </Button>

                  <div className="pt-4 border-t">
                    <Button
                      variant="destructive"
                      className="w-full justify-start"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair da Conta
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Atividades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Comunidades</span>
                      <span className="font-semibold">0</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Eventos Participados
                      </span>
                      <span className="font-semibold">0</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Eventos Criados
                      </span>
                      <span className="font-semibold">0</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
