'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { LogOut } from 'lucide-react';

interface LogoutAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LogoutAlertModal({ isOpen, onClose }: LogoutAlertModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-2">
            <LogOut className="h-5 w-5 text-orange-500" />
            <AlertDialogTitle>Sessão Expirada</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-base">
            Sua sessão expirou por inatividade. Você foi desconectado automaticamente
            para garantir a segurança da sua conta.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose}>
            Entendi
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
