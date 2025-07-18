'use client';

import { useQuery } from '@apollo/client';
import {
  Calendar,
  ExternalLink,
  Instagram,
  Link2Icon,
  Linkedin,
  MapPin,
  MessageCircle,
  Share2,
  Users,
} from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExpandableRichText } from '@/components/ui/expandable-rich-text';
import { GET_COMMUNITY_BY_ID } from '@/lib/queries';
import { CommunityResponse } from '@/lib/types';

import { getNextFutureEvents, getPastEvents } from '../utils/event';

import { RichText } from './ui/rich-text';

interface CommunityDetailsProps {
  communityId: string;
}

export function CommunityDetails({ communityId }: CommunityDetailsProps) {
  const { data, loading, error } = useQuery<CommunityResponse>(
    GET_COMMUNITY_BY_ID,
    {
      variables: { id: communityId },
    }
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-300"></div>
          <div className="container mx-auto px-4 py-12">
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Erro ao carregar comunidade
          </h2>
          <p className="text-gray-600 mb-4">
            Não foi possível carregar os detalhes da comunidade.
          </p>
          <Button onClick={() => window.location.reload()}>
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

  const community = data?.community;

  if (!community) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Comunidade não encontrada
          </h2>
          <p className="text-gray-600">
            A comunidade que você está procurando não existe ou foi removida.
          </p>
        </div>
      </div>
    );
  }

  const pastEvents = getPastEvents(community.events || []);
  const nextFutureEvents = getNextFutureEvents(community.events || []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-700">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url(${community.images?.[0]})`,
          }}
        ></div>
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-4xl">
            <h1 className="text-5xl font-bold mb-4">{community.title}</h1>
            <RichText
              content={community.short_description}
              className="text-xl mb-6 opacity-90"
            />

            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>
                  {community.members_quantity.toLocaleString()} membros
                </span>
              </div>
              {community.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{community.location}</span>
                </div>
              )}
              {community.founded_date && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>Fundada em {community.founded_date}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
                disabled={
                  !community.links ||
                  community.links.length === 0 ||
                  !community.links[0]?.url
                }
                onClick={() => {
                  if (
                    community.links &&
                    community.links.length > 0 &&
                    community.links[0].url
                  ) {
                    window.open(community.links[0].url, '_blank');
                  }
                }}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Participar da comunidade
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                onClick={() => {
                  navigator.share({
                    title: `Confira a comunidade ${community.title}\n`,
                    text: `\n${community.short_description}`,
                    url: window.location.href,
                  });
                }}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>Sobre a Comunidade</CardTitle>
              </CardHeader>
              <CardContent>
                <ExpandableRichText
                  content={
                    community.full_description || community.short_description
                  }
                  className="text-gray-600 leading-relaxed mb-6"
                />

                <div className="flex flex-wrap gap-2">
                  {community.tags.map(tag => (
                    <Badge key={tag.id} variant="secondary">
                      {tag.value}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Próximos Eventos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {!!nextFutureEvents?.length ? (
                    nextFutureEvents.map(event => (
                      <div
                        key={event.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div>
                          <h4 className="font-semibold">{event.title}</h4>
                          <p className="text-sm text-gray-600">
                            {new Date(event.start_date).toLocaleDateString(
                              'pt-BR',
                              { day: '2-digit', month: 'long', year: 'numeric' }
                            )}
                          </p>
                          {!!event.talks?.length && (
                            <p className="text-sm text-gray-600">
                              • {event.talks.length} palestras
                            </p>
                          )}
                        </div>
                        <Link href={`/events/${event.id}`}>
                          <Button variant="outline" size="sm">
                            Ver Detalhes
                          </Button>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      Nenhum evento programado no momento.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Past Events */}
            <Card>
              <CardHeader>
                <CardTitle>Eventos Realizados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {!!pastEvents?.length ? (
                    pastEvents.map(event => (
                      <div
                        key={event.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div>
                          <h4 className="font-semibold">{event.title}</h4>
                          <p className="text-sm text-gray-600">
                            {new Date(event.start_date).toLocaleDateString(
                              'pt-BR',
                              { day: '2-digit', month: 'long', year: 'numeric' }
                            )}
                          </p>
                          {!!event.talks?.length && (
                            <p className="text-sm text-gray-600">
                              • {event.talks.length} palestras
                            </p>
                          )}
                        </div>
                        <Link href={`/events/${event.id}`}>
                          <Button variant="outline" size="sm">
                            Ver Detalhes
                          </Button>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      Nenhum evento realizado ainda.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Organizers */}
            {/*  <Card>
              <CardHeader>
                <CardTitle>Organizadores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {community.organizers.map(organizer => (
                    <div
                      key={organizer.id}
                      className="flex items-center gap-3 p-3 border rounded-lg"
                    >
                      <Image
                        src={organizer.avatar || '/placeholder.svg'}
                        alt={organizer.username}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover"
                        unoptimized
                      />
                      <div>
                        <h4 className="font-semibold">{organizer.username}</h4>
                        <p className="text-sm text-gray-600">
                          {organizer.role || 'Organizador'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card> */}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Social Media Links */}
                {['whatsapp', 'instagram', 'linkedin', 'web'].map(media => {
                  const found = community.links?.find(
                    link => link.social_media === media
                  );
                  let Icon;
                  switch (media) {
                    case 'whatsapp':
                      Icon = MessageCircle;
                      break;
                    case 'instagram':
                      Icon = Instagram;
                      break;
                    case 'linkedin':
                      Icon = Linkedin;
                      break;
                    case 'web':
                      Icon = ExternalLink;
                      break;
                    default:
                      Icon = Link2Icon;
                  }
                  return found ? (
                    <a
                      key={media}
                      href={found.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:underline"
                    >
                      <Icon className="h-4 w-4" />
                      {media.charAt(0).toUpperCase() + media.slice(1)}
                    </a>
                  ) : (
                    <div
                      key={media}
                      className="flex items-center gap-2 text-gray-400"
                    >
                      <Icon className="h-4 w-4" />
                      {media.charAt(0).toUpperCase() + media.slice(1)}
                      <span className="italic">(vazio)</span>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Membros</span>
                  <span className="font-semibold">
                    {community.members_quantity.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Eventos realizados</span>
                  <span className="font-semibold">
                    {pastEvents?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Próximos eventos</span>
                  <span className="font-semibold">
                    {nextFutureEvents?.length || 0}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
