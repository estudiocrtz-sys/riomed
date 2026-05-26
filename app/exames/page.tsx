'use client'

import { useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/Button'
import { myDocuments } from '@/data/documents'
import { formatDate } from '@/lib/utils'
import { FileText, Download, Eye, Search } from 'lucide-react'
import type { DocCategory } from '@/data/documents'

const catLabel: Record<DocCategory | 'todos', string> = {
  todos: 'Todos',
  exame: 'Exames',
  receita: 'Receitas',
  atestado: 'Atestados',
  guia: 'Guias',
  laudo: 'Laudos',
}

const catColor: Record<DocCategory, string> = {
  exame: 'bg-blue-50 text-blue-700 border-blue-200',
  receita: 'bg-[#2CC295]/10 text-[#03624C] border-[#2CC295]/20',
  atestado: 'bg-purple-50 text-purple-700 border-purple-200',
  guia: 'bg-amber-50 text-amber-700 border-amber-200',
  laudo: 'bg-[#8A9390]/10 text-[#8A9390] border-[#8A9390]/20',
}

export default function ExamesPage() {
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState<DocCategory | 'todos'>('todos')

  const filtered = myDocuments.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.doctor.toLowerCase().includes(search.toLowerCase())
    const matchCat = catFilter === 'todos' || d.category === catFilter
    return matchSearch && matchCat
  })

  const newDocs = myDocuments.filter((d) => d.isNew).length

  return (
    <AppShell>
      <Header
        title="Exames e Documentos"
        subtitle={newDocs > 0 ? `${newDocs} novos documentos disponíveis` : `${myDocuments.length} documentos`}
      />
      <div className="flex-1 p-8 space-y-6">
        {/* Category filter cards */}
        <div className="grid grid-cols-6 gap-3">
          {(Object.keys(catLabel) as (DocCategory | 'todos')[]).map((cat) => {
            const count = cat === 'todos' ? myDocuments.length : myDocuments.filter((d) => d.category === cat).length
            return (
              <button
                key={cat}
                onClick={() => setCatFilter(cat)}
                className={`bg-white rounded-xl border p-3 text-center transition-all ${
                  catFilter === cat ? 'border-[#2CC295] ring-2 ring-[#2CC295]/20' : 'border-[#E8EDE9] hover:border-[#8A9390]'
                }`}
              >
                <p className="text-lg font-bold text-[#000F11]">{count}</p>
                <p className="text-[10px] text-[#8A9390] font-medium mt-0.5">{catLabel[cat]}</p>
              </button>
            )
          })}
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A9390]" />
          <input
            type="text"
            placeholder="Buscar documento ou médico..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full pl-9 pr-4 rounded-xl bg-white border border-[#D0DDD6] text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC295]/30 focus:border-[#2CC295]"
          />
        </div>

        {/* Document list */}
        <div className="space-y-2">
          {filtered.map((doc) => (
            <div key={doc.id} className={`bg-white rounded-2xl border p-4 flex items-center gap-4 transition-shadow hover:shadow-sm ${doc.isNew ? 'border-[#2CC295]/30 bg-[#2CC295]/3' : 'border-[#E8EDE9]'}`}>
              <div className="w-10 h-10 rounded-xl bg-[#F7F6F6] border border-[#E8EDE9] flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-[#03624C]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-[#000F11] truncate">{doc.name}</p>
                  {doc.isNew && (
                    <span className="px-1.5 py-0.5 bg-[#2CC295] text-[#000F11] text-[10px] font-bold rounded-full flex-shrink-0">NOVO</span>
                  )}
                </div>
                <p className="text-xs text-[#8A9390]">{doc.doctor} · {formatDate(doc.date)} · {doc.size}</p>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full border flex-shrink-0 ${catColor[doc.category]}`}>
                {catLabel[doc.category]}
              </span>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#D0DDD6] bg-white text-xs text-[#8A9390] hover:text-[#000F11] hover:border-[#8A9390] transition-all">
                  <Eye className="w-3.5 h-3.5" /> Visualizar
                </button>
                <Button size="sm" variant="outline">
                  <Download className="w-3.5 h-3.5" /> Baixar
                </Button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="py-16 text-center bg-white rounded-2xl border border-[#E8EDE9]">
              <p className="text-sm text-[#8A9390]">Nenhum documento encontrado.</p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  )
}
