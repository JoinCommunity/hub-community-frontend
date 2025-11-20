import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function OngoingEventsSectionSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2].map(i => (
        <Card
          key={i}
          className="overflow-hidden border-2 border-green-200 animate-pulse"
        >
          <div className="relative">
            <Skeleton className="h-64 w-full rounded-none" />
            <div className="absolute top-4 left-4 flex gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="absolute bottom-4 left-4">
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          <CardContent className="p-6 bg-green-50/30">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {[1, 2, 3, 4].map(j => (
                <div key={j} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>

            <div className="mb-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            <div className="flex justify-between items-center">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

