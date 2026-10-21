'use client';

import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Filter, ExternalLink } from 'lucide-react';
import { portfolioData, projectCategories } from '@/content/projects';
import { DezoCaseStudy } from './DezoCaseStudy';
import { DezoButton } from './DezoButton';
import { DezoStagger, DezoStaggerItem } from '@/lib/motion/MotionAdapter';

export function DezoWorkGallery({
  initialLimit = 12,
  featuredFirst = true,
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

  // Category counts computed accurately from live items
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: 0 };
    for (const item of portfolioData) {
      if (item.isLive) {
        counts['All'] = (counts['All'] || 0) + 1;
        counts[item.category] = (counts[item.category] || 0) + 1;
      }
    }
    return counts;
  }, []);

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
      {/* Search & Category Filter Controls */}
      <div className="flex flex-col gap-5 border-2 border-dezo-ink bg-[#FAF8F5] p-5 sm:p-6 shadow-[5px_5px_0_0_#0B0B0A]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1 max-w-lg">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-dezo-ink"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 181+ verified client websites..."
              aria-label="Search projects by title, category, or domain"
              className="w-full bg-white border-2 border-dezo-ink focus:border-dezo-primary rounded-none pl-11 pr-5 py-3 font-mono text-xs sm:text-sm text-dezo-text-primary placeholder:text-dezo-text-muted focus:outline-none shadow-[2px_2px_0_0_#0B0B0A] focus:shadow-[3px_3px_0_0_#B08D57] transition-all"
            />
          </div>

          {/* Quick Counter Badge */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-dezo-ink">
              Showing {visibleProjects.length} of {filteredProjects.length} Verified Deployments
            </span>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
          {projectCategories.map((category) => {
            const isSelected = activeCategory === category;
            const count = categoryCounts[category] || 0;
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  setDisplayCount(showAll ? Number.MAX_SAFE_INTEGER : initialLimit);
                }}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-none font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer border-2 border-dezo-ink select-none ${
                  isSelected
                    ? 'bg-dezo-ink text-white shadow-[3px_3px_0_0_#B08D57] -translate-x-0.5 -translate-y-0.5'
                    : 'bg-white hover:bg-white/80 text-dezo-ink shadow-[2px_2px_0_0_#0B0B0A] hover:shadow-[3px_3px_0_0_#B08D57]'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[10px] px-1 py-0.2 rounded-none font-mono ${
                    isSelected ? 'bg-dezo-primary text-dezo-ink font-bold' : 'bg-dezo-ink/10 text-dezo-text-muted'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Verified Project Cards */}
      {visibleProjects.length > 0 ? (
        <DezoStagger
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          stagger={0.05}
        >
          {visibleProjects.map((project, index) => (
            <DezoStaggerItem key={`${project.title}-${index}`}>
              <DezoCaseStudy project={project} />
            </DezoStaggerItem>
          ))}
        </DezoStagger>
      ) : (
        <div className="py-20 text-center flex flex-col items-center justify-center gap-4 bg-white border-2 border-dezo-ink p-8 shadow-[4px_4px_0_0_#0B0B0A]">
          <p className="font-display text-2xl font-bold text-dezo-text-primary">
            No projects matched &ldquo;{searchQuery}&rdquo;
          </p>
          <p className="text-sm font-mono text-dezo-text-muted max-w-md">
            Try adjusting your search keywords or reset category filters to browse all 181+ verified production sites.
          </p>
          <DezoButton
            variant="outline"
            size="md"
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('All');
            }}
          >
            Reset All Filters
          </DezoButton>
        </div>
      )}

      {/* Load More Pagination */}
      {hasMore && (
        <div className="flex flex-col items-center gap-3 pt-6">
          <DezoButton
            variant="secondary"
            size="lg"
            className="font-mono text-xs uppercase tracking-wider font-bold shadow-[4px_4px_0_0_#0B0B0A]"
            onClick={() => setDisplayCount((prev) => prev + 12)}
          >
            Load 12 More Live Websites
          </DezoButton>
          <p className="font-mono text-[11px] text-dezo-text-muted">
            Showing {visibleProjects.length} of {filteredProjects.length} sites
          </p>
        </div>
      )}
    </div>
  );
}
