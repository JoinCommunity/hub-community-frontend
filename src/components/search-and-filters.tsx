'use client';

import { Search, Filter } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const techCategories = [
  'JavaScript',
  'Python',
  'React',
  'Node.js',
  'DevOps',
  'Mobile',
  'AI/ML',
  'Blockchain',
  'Cloud',
  'Design',
];

export function SearchAndFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-12">
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Buscar comunidades ou eventos..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-transparent"
        >
          <Filter className="h-4 w-4" />
          Filtros
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {techCategories.map(category => (
          <Badge
            key={category}
            variant={
              selectedCategories.includes(category) ? 'default' : 'outline'
            }
            className="cursor-pointer hover:bg-blue-100"
            onClick={() => toggleCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
    </div>
  );
}
