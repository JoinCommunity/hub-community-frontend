import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Mock data - em produção viria de uma API
const events = [
  {
    id: '1',
    title: 'React Hooks na Prática',
    description:
      'Workshop hands-on sobre React Hooks e suas aplicações práticas no desenvolvimento moderno',
    date: '2024-01-15',
    time: '19:00',
    location: 'São Paulo, SP',
    attendees: 120,
    maxAttendees: 150,
    community: 'React São Paulo',
    technologies: ['React', 'JavaScript'],
    backgroundImage: '/images/react-hooks-event.png',
    type: 'Workshop',
  },
  {
    id: '2',
    title: 'Python para Data Science',
    description:
      'Introdução ao uso do Python para análise de dados e machine learning',
    date: '2024-01-20',
    time: '14:00',
    location: 'Rio de Janeiro, RJ',
    attendees: 85,
    maxAttendees: 100,
    community: 'Python Brasil',
    technologies: ['Python', 'Data Science', 'ML'],
    backgroundImage: '/images/python-datascience-event.png',
    type: 'Palestra',
  },
  {
    id: '3',
    title: 'Kubernetes em Produção',
    description:
      'Melhores práticas para deploy e gerenciamento de aplicações em Kubernetes',
    date: '2024-01-25',
    time: '18:30',
    location: 'Brasília, DF',
    attendees: 45,
    maxAttendees: 80,
    community: 'DevOps Brasília',
    technologies: ['Kubernetes', 'Docker', 'DevOps'],
    backgroundImage: '/images/kubernetes-event.png',
    type: 'Meetup',
  },
];

export function EventsSection() {
  return (
    <div className="space-y-6">
      {events.map(event => (
        <Card
          key={event.id}
          className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative">
            <Image
              src={event.backgroundImage || '/placeholder.svg'}
              alt={event.title}
              width={800}
              height={256}
              className="h-64 w-full object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
            <div className="absolute top-4 left-4">
              {/* <Badge className="bg-blue-600 text-white">{event.type}</Badge> */}
            </div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
              <p className="text-sm opacity-90">{event.community}</p>
            </div>
          </div>

          <CardContent className="p-6">
            <p className="text-gray-600 mb-4 line-clamp-2">
              {event.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {event.technologies.map(tech => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span>{new Date(event.date).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="h-4 w-4 text-blue-600" />
                <span>
                  {event.attendees}/{event.maxAttendees} inscritos
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={`/event/${event.id}`} className="flex-1">
                <Button className="w-full">Ver Detalhes</Button>
              </Link>
              <Button variant="outline" className="flex-1 bg-transparent">
                Participar
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
