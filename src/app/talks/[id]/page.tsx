import { notFound } from 'next/navigation';
import { TalkDetails } from '../../../components/talk-details';

interface TalkPageProps {
  params: {
    id: string;
  };
}

export default async function TalkPage({ params }: TalkPageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return <TalkDetails talkId={id} />;
}
