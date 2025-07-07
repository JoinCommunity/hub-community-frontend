import { Calendar, Clock, Users } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function PastEventsSectionSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card
          key={index}
          className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative">
            <Skeleton className="h-64 w-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
            <div className="absolute top-4 left-4">
              <Skeleton className="h-6 w-20" />
            </div>
            <div className="absolute top-4 right-4">
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="absolute bottom-4 left-4 text-white">
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>

            <div className="mb-4">
              <Skeleton className="h-5 w-20 mb-2" />
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, talkIndex) => (
                  <div key={talkIndex} className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {Array.from({ length: 2 }).map((_, speakerIndex) => (
                        <Skeleton
                          key={speakerIndex}
                          className="w-6 h-6 rounded-full"
                        />
                      ))}
                    </div>
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-36" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
