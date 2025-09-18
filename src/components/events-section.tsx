'use client';

import { useSuspenseQuery } from '@apollo/client';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExpandableRichText } from '@/components/ui/expandable-rich-text';
import { useFilters } from '@/contexts/filter-context';
import { GET_EVENTS } from '@/lib/queries';
import { Event, EventsResponse } from '@/lib/types';

export function EventsSection({
  onCountChange,
}: {
  onCountChange?: (count: number) => void;
}) {
  const { debouncedSearchTerm } = useFilters();

  const { data, error } = useSuspenseQuery<EventsResponse>(GET_EVENTS, {
    variables: {
      filters: debouncedSearchTerm
        ? { title: { contains: debouncedSearchTerm } }
        : {},
    },
  });

  // Filter future events (events that haven't ended yet)
  const futureEvents =
    data?.events?.data?.filter(event => {
      if (!event.end_date) return true; // If no end date, consider it future
      const eventEndDate = new Date(event.end_date);
      const now = new Date();
      return eventEndDate >= now;
    }) || [];

  // Call the onCountChange callback if provided
  React.useEffect(() => {
    if (onCountChange) {
      onCountChange(futureEvents.length);
    }
  }, [onCountChange, futureEvents.length]);

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Erro de Conexão
          </h3>
          <p className="text-red-600 mb-4">
            Não foi possível conectar ao servidor GraphQL. Verifique se o
            servidor está rodando.
          </p>
          <details className="text-sm text-red-500">
            <summary className="cursor-pointer">Detalhes do erro</summary>
            <pre className="mt-2 text-xs bg-red-100 p-2 rounded overflow-auto">
              {error.message}
            </pre>
          </details>
        </div>
      </div>
    );
  }

  if (futureEvents.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          {debouncedSearchTerm
            ? 'Nenhum evento encontrado com os filtros aplicados.'
            : 'Nenhum evento disponível no momento.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {futureEvents.map((event: Event) => (
        <Card
          key={event.id}
          className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative">
            <Image
              src={
                Array.isArray(event.images) && event.images.length > 0
                  ? event.images[0]
                  : '/placeholder.svg'
              }
              alt={typeof event.title === 'string' ? event.title : 'Event'}
              width={800}
              height={256}
              className="h-64 w-full object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
            <div className="absolute top-4 left-4">
              <Badge className="bg-blue-600 text-white">
                {event.communities[0]?.title || 'Comunidade'}
              </Badge>
            </div>

            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-2xl font-bold mb-2">
                {typeof event.title === 'string' ? event.title : 'Evento'}
              </h3>
              <p className="text-sm opacity-90">
                {event.communities[0]?.title || 'Comunidade'}
              </p>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {typeof event.start_date === 'string'
                    ? new Date(event.start_date).toLocaleDateString('pt-BR')
                    : 'Data não disponível'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {typeof event.start_date === 'string'
                    ? new Date(event.start_date).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'Horário não disponível'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {event.talks.length} palestras
                </span>
              </div>
              {event.location?.title && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {event.location.title}
                  </span>
                </div>
              )}
            </div>

            <ExpandableRichText
              content={event?.description || ''}
              className="text-gray-600 mb-4"
            />

            <div className="flex justify-between items-center">
              <Link href={`/events/${event.id}`}>
                <Button>Ver Detalhes</Button>
              </Link>
              <Button disabled variant="outline">
                Inscrever-se
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
