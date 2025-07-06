import { Suspense } from 'react';

import { CommunityGrid } from '@/components/community-grid';
import { CommunityGridSkeleton } from '@/components/community-grid-skeleton';
import { EventsSection } from '@/components/events-section';
import { EventsSectionSkeleton } from '@/components/events-section-skeleton';
import { HeroSection } from '@/components/hero-section';
import { SearchAndFilters } from '@/components/search-and-filters';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <HeroSection />

      <div className="container mx-auto px-4 py-12">
        <SearchAndFilters />

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Comunidades</h2>
          <Suspense fallback={<CommunityGridSkeleton />}>
            <CommunityGrid />
          </Suspense>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Próximos Eventos
          </h2>
          <Suspense fallback={<EventsSectionSkeleton />}>
            <EventsSection />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
