'use client';

import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { portfolioData, projectCategories } from '@/content/projects';
import { DezoCaseStudy } from './DezoCaseStudy';
import { DezoButton } from './DezoButton';
import { DezoStagger, DezoStaggerItem } from '@/lib/motion/MotionAdapter';

export function DezoWorkGallery({
  initialLimit = 9,
  featuredFirst = false,
  showAll = false,
}: {
  initialLimit?: number;
  featuredFirst?: boolean;
  /** When true, render every live match (no Load More). */
  showAll?: boolean;
}) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [displayCount, setDisplayCount] = useState<number>(
    showAll ? Number.MAX_SAFE_INTEGER : initialLimit,
  );

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    let list = portfolioData.filter((item) => {
      const matchCategory =
        activeCategory === 'All' || item.category === activeCategory;
      const matchSearch =
        query === '' ||
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.url.toLowerCase().includes(query);

      return matchCategory && matchSearch && item.isLive;
    });

    if (featuredFirst) {
      list = [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    }

    return list;
  }, [activeCategory, searchQuery, featuredFirst]);

  const visibleProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, displayCount);
  const hasMore = !showAll && displayCount < filteredProjects.length;

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <div className="relative max-w-md w-full mx-auto sm:mx-0">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-dezo-ink"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 181+ verified production sites..."
            aria-label="Search projects"
            className="w-full bg-white border-2 border-dezo-ink focus:border-dezo-ink rounded-none pl-11 pr-5 py-3 font-mono text-xs sm:text-sm text-dezo-text-primary placeholder:text-dezo-text-muted focus:outline-none shadow-[3px_3px_0_0_#0B0B0A] focus:shadow-[4px_4px_0_0_#B08D57] transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {projectCategories.map((category) => {
            const isSelected = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  setDisplayCount(showAll ? Number.MAX_SAFE_INTEGER : initialLimit);
                }}
                className={`shrink-0 px-3.5 py-2 rounded-none font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer border-2 border-dezo-ink ${
                  isSelected
                    ? 'bg-dezo-ink text-white shadow-[3px_3px_0_0_#B08D57] -translate-x-0.5 -translate-y-0.5'
                    : 'bg-white hover:bg-dezo-bg-warm text-dezo-ink shadow-[2px_2px_0_0_#0B0B0A] hover:shadow-[3px_3px_0_0_#B08D57]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {visibleProjects.length > 0 ? (
        <DezoStagger
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          stagger={0.06}
        >
          {visibleProjects.map((project, index) => (
            <DezoStaggerItem key={`${project.title}-${index}`}>
              <DezoCaseStudy project={project} />
            </DezoStaggerItem>
          ))}
        </DezoStagger>
      ) : (
        <div className="py-20 text-center flex flex-col items-center justify-center gap-3 bg-dezo-surface rounded-dezo-lg border border-dezo-border">
          <p className="text-base font-semibold text-dezo-text-primary">
            No projects matched your search.
          </p>
          <p className="text-xs text-dezo-text-muted">
            Try adjusting your query or selecting another category.
          </p>
          <DezoButton
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('All');
            }}
          >
            Reset Filters
          </DezoButton>
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center pt-8">
          <DezoButton
            variant="secondary"
            size="md"
            onClick={() => setDisplayCount((prev) => prev + 9)}
          >
            Load more
          </DezoButton>
        </div>
      )}
    </div>
  );
}
