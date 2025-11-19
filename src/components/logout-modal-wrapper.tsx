'use client';

import { LogoutAlertModal } from '@/components/logout-alert-modal';
import { useAuth } from '@/contexts/auth-context';

export function LogoutModalWrapper() {
  const { showLogoutModal, hideLogoutAlert } = useAuth();

  return (
    <LogoutAlertModal isOpen={showLogoutModal} onClose={hideLogoutAlert} />
  );
}
