'use client';

import { useState } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/auth-context';
import type { SignInInput, SignUpInput } from '@/lib/types';
import { Loader2, Lock, Mail, User } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signIn, signUp, forwardPassword, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('signin');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Sign In Form
  const [signInData, setSignInData] = useState<SignInInput>({
    identifier: '',
    password: '',
  });

  // Sign Up Form
  const [signUpData, setSignUpData] = useState<SignUpInput>({
    email: '',
    name: '',
    password: '',
    username: '',
  });

  // Password Reset
  const [resetEmail, setResetEmail] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await signIn(signInData);
      setSuccess('Login realizado com sucesso!');
      setTimeout(() => {
        onClose();
        setSuccess('');
        setSignInData({ identifier: '', password: '' });
      }, 1500);
    } catch (error) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
      console.error('Sign in error:', error);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await signUp(signUpData);
      setSuccess('Conta criada com sucesso! Faça login para continuar.');
      setTimeout(() => {
        setActiveTab('signin');
        setSuccess('');
        setSignUpData({ email: '', name: '', password: '', username: '' });
      }, 2000);
    } catch (error) {
      setError('Erro ao criar conta. Tente novamente.');
      console.error('Sign up error:', error);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await forwardPassword(resetEmail);
      setSuccess('Email de recuperação enviado!');
      setTimeout(() => {
        setResetEmail('');
        setSuccess('');
      }, 2000);
    } catch (error) {
      setError('Erro ao enviar email de recuperação.');
      console.error('Password reset error:', error);
    }
  };

  const handleClose = () => {
    setError('');
    setSuccess('');
    setActiveTab('signin');
    setSignInData({ identifier: '', password: '' });
    setSignUpData({ email: '', name: '', password: '', username: '' });
    setResetEmail('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Entrar na sua conta</DialogTitle>
          <DialogDescription>
            Faça login, cadastre-se ou recupere sua senha
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="signin">Entrar</TabsTrigger>
            <TabsTrigger value="signup">Cadastrar</TabsTrigger>
            <TabsTrigger value="reset">Recuperar</TabsTrigger>
          </TabsList>

          {/* Sign In Tab */}
          <TabsContent value="signin" className="space-y-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-identifier">Email ou Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="signin-identifier"
                    type="text"
                    placeholder="seu@email.com ou username"
                    value={signInData.identifier}
                    onChange={e =>
                      setSignInData({
                        ...signInData,
                        identifier: e.target.value,
                      })
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signin-password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="Digite sua senha"
                    value={signInData.password}
                    onChange={e =>
                      setSignInData({ ...signInData, password: e.target.value })
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>
          </TabsContent>

          {/* Sign Up Tab */}
          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Nome Completo</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={signUpData.name}
                  onChange={e =>
                    setSignUpData({ ...signUpData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="signup-username"
                    type="text"
                    placeholder="seu_username"
                    value={signUpData.username}
                    onChange={e =>
                      setSignUpData({ ...signUpData, username: e.target.value })
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={signUpData.email}
                    onChange={e =>
                      setSignUpData({ ...signUpData, email: e.target.value })
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Digite uma senha forte"
                    value={signUpData.password}
                    onChange={e =>
                      setSignUpData({ ...signUpData, password: e.target.value })
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Criando conta...
                  </>
                ) : (
                  'Criar Conta'
                )}
              </Button>
            </form>
          </TabsContent>

          {/* Password Reset Tab */}
          <TabsContent value="reset" className="space-y-4">
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={resetEmail}
                    onChange={e => setResetEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Enviar Email de Recuperação'
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Success Alert */}
        {success && (
          <Alert>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  );
}
