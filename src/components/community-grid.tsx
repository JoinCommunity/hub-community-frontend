import { MapPin, Users, Calendar, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

// Mock data - em produção viria de uma API
const communities = [
  {
    id: '1',
    name: 'React São Paulo',
    description: 'Comunidade dedicada ao React e ecossistema JavaScript',
    location: 'São Paulo, SP',
    members: 2500,
    nextEvent: '2024-01-15',
    technologies: ['React', 'JavaScript', 'TypeScript'],
    image: '/images/react-community-bg.png',
  },
  {
    id: '2',
    name: 'Python Brasil',
    description: 'A maior comunidade Python do Brasil',
    location: 'Rio de Janeiro, RJ',
    members: 5000,
    nextEvent: '2024-01-20',
    technologies: ['Python', 'Django', 'FastAPI'],
    image: '/images/python-community-bg.png',
  },
  {
    id: '3',
    name: 'DevOps Brasília',
    description: 'Práticas e ferramentas DevOps',
    location: 'Brasília, DF',
    members: 1200,
    nextEvent: '2024-01-25',
    technologies: ['Docker', 'Kubernetes', 'AWS'],
    image: '/images/devops-community-bg.png',
  },
  {
    id: '4',
    name: 'Flutter Floripa',
    description: 'Desenvolvimento mobile com Flutter',
    location: 'Florianópolis, SC',
    members: 800,
    nextEvent: '2024-02-01',
    technologies: ['Flutter', 'Dart', 'Mobile'],
    image: '/images/flutter-community-bg.png',
  },
];

export function CommunityGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {communities.map(community => (
        <Card
          key={community.id}
          className="flex flex-col h-full group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <CardHeader className="p-0">
            <div className="relative overflow-hidden rounded-t-lg">
              <Image
                src={community.image || '/placeholder.svg'}
                alt={community.name}
                width={400}
                height={192}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                unoptimized
              />
              <div className="absolute top-4 right-4">
                <Button
                  size="sm"
                  variant="secondary"
                  className="opacity-80 hover:opacity-100"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col flex-1 p-6">
            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
              {community.name}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {community.description}
            </p>

            <div className="flex flex-wrap gap-1 mb-4">
              {community.technologies.map(tech => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                {community.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                {community.members.toLocaleString()} membros
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                Próximo evento:{' '}
                {new Date(community.nextEvent).toLocaleDateString('pt-BR')}
              </div>
            </div>

            <div className="mt-auto">
              <Link href={`/community/${community.id}`}>
                <Button className="w-full">Ver Comunidade</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
