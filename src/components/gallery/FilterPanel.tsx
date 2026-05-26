'use client'

import { FilterState, Category, Orientation } from '@/types'
import { CATEGORIES, SUBCATEGORIES, COLORS } from '@/lib/templates'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

interface Props {
  filters: FilterState
  onChange: (filters: FilterState) => void
}

export default function FilterPanel({ filters, onChange }: Props) {
  const t = useTranslations('templates.filters')
  const tc = useTranslations('categories')
  const update = (patch: Partial<FilterState>) => onChange({ ...filters, ...patch })

  const activeCount = [
    filters.category,
    filters.subcategory,
    filters.orientation,
    filters.isPremium !== undefined,
    filters.hasPhoto,
    filters.isAnimated,
  ].filter(Boolean).length

  return (
    <aside className="w-full space-y-6">
      {activeCount > 0 && (
        <button onClick={() => onChange({ sort: filters.sort })} className="text-xs text-indigo-600 flex items-center gap-1 hover:text-indigo-800">
          <X className="w-3 h-3" /> {t('clearAll', { count: activeCount })}
        </button>
      )}

      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{t('category')}</h3>
        <div className="space-y-1">
          {CATEGORIES.map(cat => (
            <button key={cat.value}
              onClick={() => update({ category: filters.category === cat.value ? undefined : cat.value as Category, subcategory: undefined })}
              className={cn('w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors',
                filters.category === cat.value ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
              )}>
              <span>{cat.icon}</span>
              {tc(cat.value as Parameters<typeof tc>[0])}
            </button>
          ))}
        </div>
      </div>

      {filters.category && SUBCATEGORIES[filters.category] && (
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{t('theme')}</h3>
          <div className="flex flex-wrap gap-2">
            {SUBCATEGORIES[filters.category].map(sub => (
              <button key={sub} onClick={() => update({ subcategory: filters.subcategory === sub ? undefined : sub })}
                className={cn('px-2.5 py-1 rounded-full text-xs border transition-colors',
                  filters.subcategory === sub ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-200 text-gray-600 hover:border-indigo-300'
                )}>
                {sub}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{t('orientation')}</h3>
        <div className="flex gap-2">
          {(['portrait', 'landscape', 'square'] as Orientation[]).map(o => (
            <button key={o} onClick={() => update({ orientation: filters.orientation === o ? undefined : o })}
              className={cn('flex-1 py-1.5 text-xs rounded-lg border capitalize transition-colors',
                filters.orientation === o ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-200 text-gray-600 hover:border-indigo-300'
              )}>
              {t(o as 'portrait' | 'landscape' | 'square')}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{t('color')}</h3>
        <div className="flex flex-wrap gap-2">
          {COLORS.map(c => (
            <button key={c.value} title={c.name}
              onClick={() => update({ tags: filters.tags?.includes(c.name.toLowerCase()) ? [] : [c.name.toLowerCase()] })}
              className={cn('w-7 h-7 rounded-full border-2 transition-transform hover:scale-110',
                filters.tags?.includes(c.name.toLowerCase()) ? 'border-indigo-600 scale-110' : 'border-white shadow-sm'
              )}
              style={{ backgroundColor: c.value }}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{t('features')}</h3>
        <div className="space-y-2">
          {[{ key: 'hasPhoto', label: t('withPhoto') }].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={!!(filters as never)[key]}
                onChange={e => update({ [key]: e.target.checked ? true : undefined } as Partial<FilterState>)}
                className="rounded text-indigo-600" />
              <span className="text-sm text-gray-600">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{t('sortBy')}</h3>
        <div className="space-y-1">
          {[{ value: 'popular', label: t('popular') }, { value: 'newest', label: t('newest') }].map(opt => (
            <button key={opt.value} onClick={() => update({ sort: opt.value as 'popular' | 'newest' })}
              className={cn('w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                filters.sort === opt.value ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
              )}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
