'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { FilterState, Category } from '@/types'
import { SAMPLE_TEMPLATES, filterTemplates, CATEGORIES } from '@/lib/templates'
import FilterPanel from '@/components/gallery/FilterPanel'
import TemplateCard from '@/components/gallery/TemplateCard'
import { SlidersHorizontal, X } from 'lucide-react'

export default function TemplatesPage() {
  const searchParams = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    category: searchParams.get('category') as Category | undefined ?? undefined,
    sort: 'popular',
  })

  useEffect(() => {
    const cat = searchParams.get('category') as Category | undefined
    if (cat) setFilters(prev => ({ ...prev, category: cat }))
  }, [searchParams])

  const results = filterTemplates(SAMPLE_TEMPLATES, filters)
  const activeCategory = CATEGORIES.find(c => c.value === filters.category)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {activeCategory ? `${activeCategory.icon} ${activeCategory.label} Templates` : 'All Templates'}
        </h1>
        <p className="text-gray-500 mt-1">{results.length} designs available</p>
      </div>

      <div className="flex gap-8">
        {/* Desktop filter sidebar */}
        <div className="hidden lg:block w-56 flex-shrink-0">
          <FilterPanel filters={filters} onChange={setFilters} />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Mobile filter toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 hover:border-indigo-300"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {showFilters && <X className="w-4 h-4 ml-1" />}
            </button>
            {showFilters && (
              <div className="mt-4 p-4 border rounded-xl bg-white shadow-lg">
                <FilterPanel filters={filters} onChange={setFilters} />
              </div>
            )}
          </div>

          {results.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-lg">No templates match your filters.</p>
              <button
                className="mt-4 text-indigo-600 hover:underline"
                onClick={() => setFilters({ sort: 'popular' })}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {results.map(template => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
