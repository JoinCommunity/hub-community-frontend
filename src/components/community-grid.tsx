'use client';

import { useSuspenseQuery } from '@apollo/client';
import { Calendar, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { GET_COMMUNITIES } from '@/lib/queries';
import { CommunitiesResponse, Community, Tag } from '@/lib/types';

import { getNextFutureEvents } from '../utils/event';

export function CommunityGrid() {
  const { data, error } =
    useSuspenseQuery<CommunitiesResponse>(GET_COMMUNITIES);

  if (error) {
    return <div>Erro ao carregar comunidades.</div>;
  }

  const communities = data?.communities?.data || [];

  // Ensure communities is an array and filter out invalid entries
  const validCommunities = Array.isArray(communities)
    ? communities.filter(
        community => community && typeof community === 'object' && community.id
      )
    : [];

  const nextFutureEvents = getNextFutureEvents(
    validCommunities.flatMap(community => community.events || [])
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {validCommunities?.map((community: Community) => (
        <Card
          key={community.id}
          className="flex flex-col h-full group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <CardHeader className="p-0">
            <div className="relative overflow-hidden rounded-t-lg">
              <Image
                src={
                  Array.isArray(community.images) && community.images[0]
                    ? community.images[0]
                    : '/placeholder.svg'
                }
                alt={
                  typeof community.title === 'string'
                    ? community.title
                    : 'Community'
                }
                width={400}
                height={192}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                unoptimized
              />
              {/* <div className="absolute top-4 right-4">
                <Button
                  size="sm"
                  variant="secondary"
                  className="opacity-80 hover:opacity-100"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div> */}
            </div>
          </CardHeader>

          <CardContent className="flex flex-col flex-1 p-6">
            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
              {typeof community.title === 'string'
                ? community.title
                : 'Título não disponível'}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {typeof community.short_description === 'string'
                ? community.short_description
                : 'Descrição não disponível'}
            </p>

            <div className="flex flex-wrap gap-1 mb-4">
              {community.tags?.map((tag: Tag) => (
                <Badge key={tag.id} variant="secondary" className="text-xs">
                  {typeof tag.value === 'string' ? tag.value : 'Tag'}
                </Badge>
              ))}
            </div>

            <div className="space-y-2 mb-4">
              {/* Location display - commented out due to missing location property in Community type */}
              {/* <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                {community.location}
              </div> */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                {typeof community.members_quantity === 'number'
                  ? `${community.members_quantity} membros`
                  : '0 membros'}
              </div>
              {!!nextFutureEvents?.length && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  Próximo evento:{' '}
                  {new Date(nextFutureEvents[0].start_date).toLocaleDateString(
                    'pt-BR'
                  )}
                </div>
              )}
            </div>

            <div className="mt-auto">
              <Link href={`/communities/${community.id}`}>
                <Button className="w-full">Ver Comunidade</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
