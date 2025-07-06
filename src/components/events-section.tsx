'use client';

import { useSuspenseQuery } from '@apollo/client';
import { Calendar, Clock, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GET_EVENTS } from '@/lib/queries';
import { Event, EventsResponse } from '@/lib/types';

export function EventsSection() {
  const { data, error } = useSuspenseQuery<EventsResponse>(GET_EVENTS);

  if (error) {
    return <div>Erro ao carregar eventos.</div>;
  }

  const events = data?.events?.data || [];

  // Ensure events is an array and filter out invalid entries
  const validEvents = Array.isArray(events)
    ? events.filter(event => event && typeof event === 'object' && event.id)
    : [];

  return (
    <div className="space-y-6">
      {validEvents.map((event: Event) => (
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
                {event.communities[0].title}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
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
            </div>

            <p className="text-gray-600 mb-4">
              {typeof event.description === 'string'
                ? event.description
                : 'Descrição não disponível'}
            </p>

            {event.talks.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Palestras:</h4>
                <div className="space-y-2">
                  {event.talks.slice(0, 3).map(talk => (
                    <div key={talk.id} className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {talk.speakers.slice(0, 3).map(speaker => (
                          <div
                            key={speaker.id}
                            className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs"
                          >
                            {speaker.avatar &&
                            typeof speaker.avatar === 'string' ? (
                              <Image
                                src={speaker.avatar}
                                alt={
                                  typeof speaker.name === 'string'
                                    ? speaker.name
                                    : 'Speaker'
                                }
                                width={24}
                                height={24}
                                className="rounded-full"
                                unoptimized
                              />
                            ) : typeof speaker.name === 'string' ? (
                              speaker.name.charAt(0).toUpperCase()
                            ) : (
                              '?'
                            )}
                          </div>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {typeof talk.title === 'string'
                          ? talk.title
                          : 'Palestra'}
                      </span>
                    </div>
                  ))}
                  {event.talks.length > 3 && (
                    <span className="text-sm text-gray-500">
                      +{event.talks.length - 3} mais palestras
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center">
              <Link href={`/event/${event.id}`}>
                <Button>Ver Detalhes</Button>
              </Link>
              <Button variant="outline">Inscrever-se</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
