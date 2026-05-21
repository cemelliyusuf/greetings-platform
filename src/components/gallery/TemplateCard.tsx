'use client'

import Link from 'next/link'
import { Template } from '@/types'
import { Badge } from '@/components/ui/badge'
import TemplatePreview from './TemplatePreview'
import { Crown, Download, Sparkles } from 'lucide-react'

interface Props {
  template: Template
}

export default function TemplateCard({ template }: Props) {
  return (
    <Link href={`/editor?template=${template.id}`} className="group block">
      <div className="relative rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5">
        <div className="relative bg-gray-50 aspect-[5/7] overflow-hidden">
          <TemplatePreview template={template} fill />
          {template.is_animated && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-gradient-to-r from-pink-500 to-violet-500 text-white border-0 gap-1 text-xs">
                <Sparkles className="w-3 h-3" />
                GIF
              </Badge>
            </div>
          )}
          {template.is_premium && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-yellow-500 text-white border-0 gap-1 text-xs">
                <Crown className="w-3 h-3" />
                Premium
              </Badge>
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-900 font-semibold text-sm px-4 py-2 rounded-full shadow">
              Customize
            </span>
          </div>
        </div>
        <div className="p-3 bg-white">
          <p className="font-medium text-gray-800 text-sm truncate">{template.title}</p>
          <div className="flex items-center justify-between mt-1">
            <div className="flex gap-1">
              {template.color_palette.slice(0, 3).map((color, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full border border-white shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400 flex items-center gap-0.5">
              <Download className="w-3 h-3" />
              {template.downloads.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
