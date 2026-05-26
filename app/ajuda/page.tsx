'use client'

import { useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/Button'
import { ChevronDown, ChevronUp, MessageSquare, Phone, Mail } from 'lucide-react'

const faqs = [
  { q: 'Como faço para agendar uma consulta?', a: 'Clique em "Agendar Consulta" no menu lateral ou no botão na tela inicial. Siga as etapas: escolha a especialidade, o médico, a unidade, a data e o horário.' },
  { q: 'Posso cancelar ou remarcar minha consulta?', a: 'Sim. Acesse "Minhas Consultas", localize a consulta e clique em "Remarcar" ou "Cancelar". Cancelamentos com menos de 24h de antecedência podem gerar taxa.' },
  { q: 'Como acesso meus resultados de exames?', a: 'Vá em "Exames e Documentos" no menu lateral. Os resultados disponíveis aparecerão com a marcação "NOVO" quando liberados pela clínica.' },
  { q: 'Como atualizo meus dados pessoais?', a: 'Acesse "Meu Perfil" no menu lateral. Lá você pode editar seus dados pessoais, informações de saúde, convênio, contato de emergência e preferências.' },
  { q: 'Meu convênio é aceito na RIOMed?', a: 'A RIOMed aceita os principais planos de saúde. Verifique na seção "Convênio" do seu perfil ou entre em contato com nossa central de atendimento.' },
  { q: 'Como recebo lembretes das minhas consultas?', a: 'Configure suas preferências em "Meu Perfil → Preferências". Você pode receber lembretes por SMS, e-mail ou WhatsApp.' },
  { q: 'Como escolho a unidade mais próxima?', a: 'Acesse "Unidades" no menu lateral para ver endereços, horários e especialidades de cada unidade RIOMed no Rio de Janeiro.' },
  { q: 'O que faço se esquecer minha senha?', a: 'Na tela de login, clique em "Esqueci minha senha". Um link de recuperação será enviado para o e-mail cadastrado.' },
]

export default function AjudaPage() {
  const [expanded, setExpanded] = useState<number | null>(0)

  return (
    <AppShell>
      <Header title="Ajuda" subtitle="Dúvidas frequentes e suporte" />
      <div className="flex-1 p-8">
        <div className="grid grid-cols-3 gap-8">
          {/* FAQ */}
          <div className="col-span-2 space-y-3">
            <h2 className="text-base font-semibold text-[#000F11] mb-5">Perguntas Frequentes</h2>
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#E8EDE9] overflow-hidden">
                <button
                  className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-[#F7F6F6] transition-colors"
                  onClick={() => setExpanded(expanded === i ? null : i)}
                >
                  <span className="flex-1 text-sm font-medium text-[#000F11]">{faq.q}</span>
                  {expanded === i ? (
                    <ChevronUp className="w-4 h-4 text-[#8A9390] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#8A9390] flex-shrink-0" />
                  )}
                </button>
                {expanded === i && (
                  <div className="px-5 pb-4 text-sm text-[#8A9390] border-t border-[#F7F6F6] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Support contacts */}
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-[#000F11]">Fale Conosco</h2>
            {[
              {
                icon: Phone,
                title: 'Central de Atendimento',
                info: '(21) 3040-8800',
                sub: 'Seg–Sex: 07h–20h | Sáb: 08h–14h',
                action: 'Ligar agora',
              },
              {
                icon: MessageSquare,
                title: 'Chat Online',
                info: 'Atendimento imediato',
                sub: 'Disponível durante horário comercial',
                action: 'Iniciar chat',
              },
              {
                icon: Mail,
                title: 'E-mail',
                info: 'contato@riomed.com.br',
                sub: 'Resposta em até 24 horas',
                action: 'Enviar e-mail',
              },
            ].map(({ icon: Icon, title, info, sub, action }) => (
              <div key={title} className="bg-white rounded-2xl border border-[#E8EDE9] p-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-[#2CC295]/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#03624C]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#000F11]">{title}</p>
                    <p className="text-sm text-[#000F11] font-medium">{info}</p>
                    <p className="text-[10px] text-[#8A9390] mt-0.5">{sub}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">{action}</Button>
              </div>
            ))}

            <div className="bg-gradient-to-br from-[#03624C] to-[#000F11] rounded-2xl p-5 text-white">
              <p className="text-sm font-bold mb-1">Emergências Médicas</p>
              <p className="text-white/70 text-xs mb-3">Para emergências, ligue imediatamente para o SAMU.</p>
              <p className="text-3xl font-black text-[#2CC295]">192</p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
