import { notFound } from 'next/navigation';

import { AgendaDetails } from '@/components/agenda-details';

interface AgendaPageProps {
  params: {
    id: string;
  };
}

export default async function AgendaPage({ params }: AgendaPageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return <AgendaDetails agendaId={id} />;
}
