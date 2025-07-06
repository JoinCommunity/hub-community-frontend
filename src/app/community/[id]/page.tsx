'use client';

import { format } from 'date-fns';
import {
  Calendar,
  Github,
  Globe,
  Heart,
  Linkedin,
  MapPin,
  Share2,
  Twitter,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data - em produção viria de uma API
const communities = {
  '1': {
    id: '1',
    name: 'React São Paulo',
    description:
      'A React São Paulo é uma comunidade dedicada ao React e todo o ecossistema JavaScript. Organizamos meetups mensais, workshops e eventos especiais para conectar desenvolvedores e compartilhar conhecimento.',
    longDescription:
      'Nossa comunidade foi fundada em 2018 com o objetivo de reunir desenvolvedores interessados em React, JavaScript e tecnologias relacionadas. Realizamos eventos regulares que incluem palestras técnicas, workshops práticos, networking e discussões sobre as últimas tendências do mercado.',
    location: 'São Paulo, SP',
    members: 2500,
    founded: '2018',
    technologies: ['React', 'JavaScript', 'TypeScript', 'Next.js', 'Node.js'],
    image: '/images/react-community-bg.png',
    website: 'https://reactsp.org',
    github: 'https://github.com/reactsp',
    twitter: 'https://twitter.com/reactsp',
    linkedin: 'https://linkedin.com/company/reactsp',
    upcomingEvents: [
      {
        id: '1',
        title: 'React Hooks na Prática',
        date: '2024-01-15',
        attendees: 120,
      },
      {
        id: '2',
        title: 'Next.js 14 - Novidades',
        date: '2024-02-10',
        attendees: 95,
      },
    ],
    organizers: [
      {
        name: 'João Silva',
        role: 'Organizador Principal',
        avatar: '/placeholder.svg',
      },
      {
        name: 'Maria Santos',
        role: 'Co-organizadora',
        avatar: '/placeholder.svg',
      },
      {
        name: 'Pedro Costa',
        role: 'Coordenador de Eventos',
        avatar: '/placeholder.svg',
      },
    ],
  },
};

interface CommunityPageProps {
  params: {
    id: string;
  };
}

export default async function CommunityPage({ params }: CommunityPageProps) {
  const { id } = await params;
  const community = communities[id as keyof typeof communities];

  if (!community) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-700">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${community.image})` }}
        ></div>
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-4xl">
            <h1 className="text-5xl font-bold mb-4">{community.name}</h1>
            <p className="text-xl mb-6 opacity-90">{community.description}</p>

            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>{community.members.toLocaleString()} membros</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{community.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>Fundada em {community.founded}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Heart className="h-4 w-4 mr-2" />
                Participar da comunidade
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                onClick={() => {
                  navigator.share({
                    title: `Conheça a comunidade ${community.name}\n`,
                    text: `\n${community.description}`,
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
                <p className="text-gray-600 leading-relaxed mb-6">
                  {community.longDescription}
                </p>

                <div className="flex flex-wrap gap-2">
                  {community.technologies.map(tech => (
                    <Badge key={tech} variant="secondary">
                      {tech}
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
                  {community.upcomingEvents.map(event => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div>
                        <h4 className="font-semibold">{event.title}</h4>
                        <p className="text-sm text-gray-600">
                          {event.date
                            ? format(new Date(event.date), 'dd/MM/yyyy - HH:mm')
                            : 'Data não definida'}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver Detalhes
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Organizers */}
            <Card>
              <CardHeader>
                <CardTitle>Organizadores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {community.organizers.map((organizer, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 border rounded-lg"
                    >
                      <Image
                        src={organizer.avatar || '/placeholder.svg'}
                        alt={organizer.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover"
                        unoptimized
                      />
                      <div>
                        <h4 className="font-semibold">{organizer.name}</h4>
                        {/* <p className="text-sm text-gray-600">
                          {organizer.role}
                        </p> */}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a
                  href={community.website}
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <Globe className="h-4 w-4" />
                  Website
                </a>
                <a
                  href={community.github}
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
                <a
                  href={community.twitter}
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <Twitter className="h-4 w-4" />
                  Twitter
                </a>
                <a
                  href={community.linkedin}
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
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
                    {community.members.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Eventos realizados</span>
                  <span className="font-semibold">45</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Próximos eventos</span>
                  <span className="font-semibold">
                    {community.upcomingEvents.length}
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
