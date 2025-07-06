import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Share2,
  Heart,
  ExternalLink,
} from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data - em produção viria de uma API
const events = {
  '1': {
    id: '1',
    title: 'React Hooks na Prática',
    description:
      'Workshop hands-on sobre React Hooks e suas aplicações práticas no desenvolvimento moderno',
    longDescription:
      'Neste workshop intensivo, você aprenderá a usar React Hooks de forma eficiente e prática. Abordaremos desde os hooks básicos como useState e useEffect até hooks mais avançados como useContext, useReducer e custom hooks. O evento é totalmente hands-on, com exercícios práticos e projetos reais.',
    date: '2024-01-15',
    time: '19:00',
    duration: '3 horas',
    location: 'São Paulo, SP',
    venue: 'Auditório TechHub - Av. Paulista, 1000',
    attendees: 120,
    maxAttendees: 150,
    community: 'React São Paulo',
    communityId: '1',
    technologies: ['React', 'JavaScript', 'Hooks'],
    backgroundImage: '/images/react-hooks-event.png',
    type: 'Workshop',
    level: 'Intermediário',
    price: 'Gratuito',
    agenda: [
      { time: '19:00', title: 'Abertura e Networking' },
      { time: '19:15', title: 'Introdução aos React Hooks' },
      { time: '20:00', title: 'Hands-on: useState e useEffect' },
      { time: '20:45', title: 'Intervalo' },
      { time: '21:00', title: 'Hooks Avançados e Custom Hooks' },
      { time: '21:45', title: 'Q&A e Encerramento' },
    ],
    speakers: [
      {
        name: 'João Silva',
        role: 'Senior React Developer',
        company: 'TechCorp',
        bio: 'Desenvolvedor React com 5+ anos de experiência, contribuidor open source',
        avatar: '/placeholder.svg',
      },
      {
        name: 'Maria Santos',
        role: 'Frontend Architect',
        company: 'StartupXYZ',
        bio: 'Especialista em arquitetura frontend e performance de aplicações React',
        avatar: '/placeholder.svg',
      },
    ],
    requirements: [
      'Conhecimento básico de React',
      'JavaScript ES6+',
      'Laptop com Node.js instalado',
      'Editor de código (VS Code recomendado)',
    ],
  },
};

interface EventPageProps {
  params: {
    id: string;
  };
}

export default function EventPage({ params }: EventPageProps) {
  const event = events[params.id as keyof typeof events];

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${event.backgroundImage})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-blue-600 text-white">{event.type}</Badge>
              <Badge variant="outline" className="border-white text-white">
                {event.level}
              </Badge>
            </div>

            <h1 className="text-5xl font-bold mb-4">{event.title}</h1>
            <p className="text-xl mb-6 opacity-90">{event.description}</p>

            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{new Date(event.date).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>
                  {event.time} ({event.duration})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>
                  {event.attendees}/{event.maxAttendees} inscritos
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Participar do Evento
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
              >
                <Heart className="h-4 w-4 mr-2" />
                Favoritar
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
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
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Sobre o Evento</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {event.longDescription}
                </p>

                <div className="flex flex-wrap gap-2">
                  {event.technologies.map(tech => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Agenda */}
            <Card>
              <CardHeader>
                <CardTitle>Programação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {event.agenda.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-3 border-l-4 border-blue-600 bg-blue-50"
                    >
                      <div className="text-blue-600 font-semibold min-w-[60px]">
                        {item.time}
                      </div>
                      <div className="font-medium">{item.title}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Speakers */}
            <Card>
              <CardHeader>
                <CardTitle>Palestrantes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {event.speakers.map((speaker, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-4 border rounded-lg"
                    >
                      <Image
                        src={speaker.avatar || '/placeholder.svg'}
                        alt={speaker.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full object-cover"
                        unoptimized
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">
                          {speaker.name}
                        </h4>
                        <p className="text-blue-600 font-medium">
                          {speaker.role}
                        </p>
                        <p className="text-gray-600 text-sm mb-2">
                          {speaker.company}
                        </p>
                        <p className="text-gray-700">{speaker.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Pré-requisitos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {event.requirements.map((req, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informações do Evento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Data</span>
                  <span className="font-semibold">
                    {new Date(event.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Horário</span>
                  <span className="font-semibold">{event.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duração</span>
                  <span className="font-semibold">{event.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Preço</span>
                  <span className="font-semibold text-green-600">
                    {event.price}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vagas</span>
                  <span className="font-semibold">
                    {event.attendees}/{event.maxAttendees}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle>Local</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="font-semibold">{event.venue}</p>
                  <p className="text-gray-600">{event.location}</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver no Mapa
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Community */}
            <Card>
              <CardHeader>
                <CardTitle>Organizado por</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <h4 className="font-semibold text-lg mb-2">
                    {event.community}
                  </h4>
                  <Button variant="outline" className="w-full bg-transparent">
                    Ver Comunidade
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
