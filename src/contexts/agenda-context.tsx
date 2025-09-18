'use client';

import { useQuery } from '@apollo/client';
import { createContext, useContext, useEffect, type ReactNode } from 'react';

import { GET_AGENDAS } from '@/lib/queries';
import type { AgendaContextType, AgendasResponse } from '@/lib/types';
import { useAuth } from './auth-context';

const AgendaContext = createContext<AgendaContextType | undefined>(undefined);

export function AgendaProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, token } = useAuth();

  const { data, loading, refetch } = useQuery<AgendasResponse>(GET_AGENDAS, {
    skip: !isAuthenticated || !token,
    fetchPolicy: 'cache-and-network',
  });

  const agendas = data?.agendas?.data || [];

  const refetchAgendas = async () => {
    if (isAuthenticated && token) {
      await refetch();
    }
  };

  // Refetch agendas when user logs in
  useEffect(() => {
    if (isAuthenticated && token) {
      refetchAgendas();
    }
  }, [isAuthenticated, token]);

  const value: AgendaContextType = {
    agendas,
    isLoading: loading,
    refetchAgendas,
  };

  return (
    <AgendaContext.Provider value={value}>{children}</AgendaContext.Provider>
  );
}

export function useAgenda() {
  const context = useContext(AgendaContext);
  if (context === undefined) {
    throw new Error('useAgenda must be used within an AgendaProvider');
  }
  return context;
}
