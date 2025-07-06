import {
  Users,
  Target,
  Heart,
  Zap,
  Github,
  Twitter,
  Linkedin,
  Mail,
} from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Sobre o TechCommunities</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Nossa missão é conectar desenvolvedores e comunidades de tecnologia
            em todo o Brasil, facilitando o acesso ao conhecimento e promovendo
            o networking entre profissionais da área.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Mission Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Nossa História
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                O TechCommunities nasceu da necessidade de centralizar
                informações sobre comunidades e eventos de tecnologia no Brasil.
                Percebemos que muitos desenvolvedores talentosos estavam
                perdendo oportunidades incríveis de aprendizado e networking
                simplesmente porque não sabiam onde encontrar essas informações.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Desde 2023, já conectamos mais de 10.000 desenvolvedores com
                suas comunidades ideais, facilitando o acesso a mais de 1.000
                eventos em todo o país.
              </p>
              <Button size="lg">Junte-se a Nós</Button>
            </div>
            <div className="relative">
              <Image
                src="/images/hero-background.png"
                alt="Equipe TechCommunities"
                width={800}
                height={320}
                className="rounded-lg shadow-lg w-full h-80 object-cover"
                unoptimized
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Nossos Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Comunidade</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Acreditamos no poder da colaboração e do compartilhamento de
                  conhecimento.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Foco</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Mantemos o foco em conectar pessoas com as oportunidades
                  certas.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Paixão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Somos apaixonados por tecnologia e pelo crescimento da
                  comunidade tech.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Inovação</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Buscamos sempre novas formas de melhorar a experiência dos
                  usuários.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-center mb-12">
                Nosso Impacto
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold mb-2">500+</div>
                  <div className="text-lg opacity-90">
                    Comunidades Cadastradas
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">10K+</div>
                  <div className="text-lg opacity-90">
                    Desenvolvedores Conectados
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">1K+</div>
                  <div className="text-lg opacity-90">Eventos Realizados</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">50+</div>
                  <div className="text-lg opacity-90">Cidades Atendidas</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Nossa Equipe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Image
                  src="/placeholder.svg"
                  alt="João Silva"
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  unoptimized
                />
                <h3 className="text-xl font-semibold mb-2">João Silva</h3>
                <p className="text-blue-600 mb-2">Fundador & CEO</p>
                <p className="text-gray-600 text-sm mb-4">
                  Desenvolvedor Full Stack com 8+ anos de experiência em
                  comunidades tech.
                </p>
                <div className="flex justify-center space-x-3">
                  <Github className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                  <Twitter className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                  <Linkedin className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Image
                  src="/placeholder.svg"
                  alt="Maria Santos"
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  unoptimized
                />
                <h3 className="text-xl font-semibold mb-2">Maria Santos</h3>
                <p className="text-blue-600 mb-2">CTO</p>
                <p className="text-gray-600 text-sm mb-4">
                  Especialista em arquitetura de software e liderança de equipes
                  técnicas.
                </p>
                <div className="flex justify-center space-x-3">
                  <Github className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                  <Twitter className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                  <Linkedin className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Image
                  src="/placeholder.svg"
                  alt="Pedro Costa"
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  unoptimized
                />
                <h3 className="text-xl font-semibold mb-2">Pedro Costa</h3>
                <p className="text-blue-600 mb-2">Head of Community</p>
                <p className="text-gray-600 text-sm mb-4">
                  Especialista em engajamento de comunidades e organização de
                  eventos.
                </p>
                <div className="flex justify-center space-x-3">
                  <Github className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                  <Twitter className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                  <Linkedin className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <Card className="bg-gray-50">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Entre em Contato
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Tem alguma dúvida, sugestão ou quer fazer parte da nossa equipe?
                Adoraríamos ouvir de você!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Enviar Email
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Twitter className="h-4 w-4" />
                  Seguir no Twitter
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
