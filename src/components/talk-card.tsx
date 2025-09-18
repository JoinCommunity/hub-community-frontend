'use client';

import { ExternalLink, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Talk } from '@/lib/types';

interface TalkCardProps {
  talk: Talk;
}

export function TalkCard({ talk }: TalkCardProps) {
  return (
    <div
      className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors ${
        talk.highlight ? 'border-blue-200 bg-blue-50' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold">
              {typeof talk.title === 'string'
                ? talk.title
                : 'Título não disponível'}
            </h4>
            {talk.highlight && (
              <Badge variant="default" className="bg-blue-600">
                Destaque
              </Badge>
            )}
          </div>
          {talk.description && typeof talk.description === 'string' && (
            <p className="text-sm text-gray-600 mb-3">{talk.description}</p>
          )}
          {talk.room_description &&
            typeof talk.room_description === 'string' && (
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <MapPin className="h-4 w-4" />
                <span>{talk.room_description}</span>
              </div>
            )}
          {talk.speakers &&
            Array.isArray(talk.speakers) &&
            talk.speakers.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {talk.speakers.map(speaker => (
                  <div key={speaker.id} className="flex items-center gap-2">
                    <Image
                      src={speaker.avatar || '/placeholder-user.jpg'}
                      alt={
                        typeof speaker.name === 'string'
                          ? speaker.name
                          : 'Speaker'
                      }
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded-full object-cover"
                      unoptimized
                    />
                    <span className="text-sm font-medium">
                      {typeof speaker.name === 'string'
                        ? speaker.name
                        : 'Speaker'}
                    </span>
                  </div>
                ))}
              </div>
            )}
        </div>
        {talk.documentId && (
          <div className="ml-4 flex-shrink-0">
            <Link href={`/talks/${talk.documentId}`}>
              <Button
                size="sm"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Ver Detalhes
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
