'use client'

import { useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/Button'
import { currentPatient } from '@/data/patient'
import { Save, User, Shield, Bell, Heart, Phone, Lock } from 'lucide-react'

const sections = [
  { id: 'dados', label: 'Dados Pessoais', icon: User },
  { id: 'saude', label: 'Informações de Saúde', icon: Heart },
  { id: 'convenio', label: 'Convênio', icon: Shield },
  { id: 'emergencia', label: 'Contato de Emergência', icon: Phone },
  { id: 'notificacoes', label: 'Preferências', icon: Bell },
  { id: 'seguranca', label: 'Segurança', icon: Lock },
]

function Field({ label, defaultValue, type = 'text', readOnly = false }: { label: string; defaultValue: string; type?: string; readOnly?: boolean }) {
  return (
    <div>
      <label className="text-xs font-semibold text-[#8A9390] uppercase tracking-wide">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        readOnly={readOnly}
        className={`mt-1.5 w-full px-3 py-2.5 rounded-xl border text-sm transition-all ${
          readOnly
            ? 'bg-[#F7F6F6] border-[#E8EDE9] text-[#8A9390] cursor-not-allowed'
            : 'bg-white border-[#D0DDD6] text-[#000F11] focus:outline-none focus:ring-2 focus:ring-[#2CC295]/30 focus:border-[#2CC295]'
        }`}
      />
    </div>
  )
}

export default function PerfilPage() {
  const [activeSection, setActiveSection] = useState('dados')
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <AppShell>
      <Header title="Meu Perfil" subtitle="Gerencie suas informações pessoais" />
      <div className="flex-1 p-8">
        <div className="grid grid-cols-4 gap-6">
          {/* Sidebar nav */}
          <div className="space-y-1">
            {/* Avatar */}
            <div className="flex flex-col items-center p-5 bg-white rounded-2xl border border-[#E8EDE9] mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2CC295] to-[#03624C] flex items-center justify-center text-white text-2xl font-bold mb-3">
                MC
              </div>
              <p className="text-sm font-bold text-[#000F11]">{currentPatient.name}</p>
              <p className="text-xs text-[#2CC295] font-medium">{currentPatient.insurance}</p>
              <p className="text-[10px] text-[#8A9390] mt-0.5">Paciente desde {currentPatient.patientSince}</p>
              <button className="mt-3 text-xs text-[#03624C] font-medium hover:text-[#2CC295] transition-colors">
                Alterar foto
              </button>
            </div>

            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                  activeSection === id ? 'bg-[#03624C] text-white' : 'text-[#8A9390] hover:bg-white hover:text-[#000F11]'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />{label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="col-span-3">
            {activeSection === 'dados' && (
              <div className="bg-white rounded-2xl border border-[#E8EDE9] p-6 space-y-5">
                <h2 className="text-base font-semibold text-[#000F11]">Dados Pessoais</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Nome completo" defaultValue={currentPatient.name} />
                  <Field label="CPF" defaultValue={currentPatient.cpf} readOnly />
                  <Field label="Data de nascimento" defaultValue="18/05/1990" type="date" />
                  <Field label="Gênero" defaultValue={currentPatient.gender} />
                  <Field label="Estado civil" defaultValue={currentPatient.maritalStatus} />
                  <Field label="Telefone" defaultValue={currentPatient.phone} type="tel" />
                  <Field label="E-mail" defaultValue={currentPatient.email} type="email" />
                  <Field label="CEP" defaultValue={currentPatient.cep} />
                </div>
                <Field label="Endereço completo" defaultValue={currentPatient.address} />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Cidade" defaultValue={currentPatient.city} />
                  <Field label="Estado" defaultValue={currentPatient.state} />
                </div>
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4" /> {saved ? 'Salvo!' : 'Salvar Alterações'}
                </Button>
              </div>
            )}

            {activeSection === 'saude' && (
              <div className="bg-white rounded-2xl border border-[#E8EDE9] p-6 space-y-5">
                <h2 className="text-base font-semibold text-[#000F11]">Informações de Saúde</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Tipo sanguíneo" defaultValue={currentPatient.bloodType} />
                  <Field label="Alergias" defaultValue={currentPatient.allergies.join(', ') || 'Nenhuma'} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#8A9390] uppercase tracking-wide">Condições crônicas</label>
                  <textarea
                    defaultValue={currentPatient.chronicConditions.join('\n')}
                    rows={3}
                    className="mt-1.5 w-full px-3 py-2.5 rounded-xl border border-[#D0DDD6] text-sm text-[#000F11] focus:outline-none focus:ring-2 focus:ring-[#2CC295]/30 focus:border-[#2CC295] resize-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#8A9390] uppercase tracking-wide">Medicamentos em uso</label>
                  <textarea
                    defaultValue={currentPatient.medications.join('\n')}
                    rows={3}
                    className="mt-1.5 w-full px-3 py-2.5 rounded-xl border border-[#D0DDD6] text-sm text-[#000F11] focus:outline-none focus:ring-2 focus:ring-[#2CC295]/30 focus:border-[#2CC295] resize-none"
                  />
                </div>
                <Button onClick={handleSave}><Save className="w-4 h-4" /> Salvar</Button>
              </div>
            )}

            {activeSection === 'convenio' && (
              <div className="bg-white rounded-2xl border border-[#E8EDE9] p-6 space-y-5">
                <h2 className="text-base font-semibold text-[#000F11]">Convênio</h2>
                <div className="bg-gradient-to-br from-[#03624C] to-[#000F11] rounded-2xl p-5 text-white mb-4">
                  <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Cartão do Paciente</p>
                  <p className="text-xl font-bold">{currentPatient.name}</p>
                  <p className="text-[#2CC295] font-semibold mt-1">{currentPatient.insurance}</p>
                  <p className="text-sm text-white/60 mt-3 font-mono">{currentPatient.insuranceNumber}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Plano" defaultValue={currentPatient.insurance} />
                  <Field label="Número do cartão" defaultValue={currentPatient.insuranceNumber} readOnly />
                </div>
                <Button onClick={handleSave}><Save className="w-4 h-4" /> Salvar</Button>
              </div>
            )}

            {activeSection === 'emergencia' && (
              <div className="bg-white rounded-2xl border border-[#E8EDE9] p-6 space-y-5">
                <h2 className="text-base font-semibold text-[#000F11]">Contato de Emergência</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Nome" defaultValue={currentPatient.emergencyContact.name} />
                  <Field label="Relação" defaultValue={currentPatient.emergencyContact.relation} />
                  <Field label="Telefone" defaultValue={currentPatient.emergencyContact.phone} type="tel" />
                </div>
                <Button onClick={handleSave}><Save className="w-4 h-4" /> Salvar</Button>
              </div>
            )}

            {activeSection === 'notificacoes' && (
              <div className="bg-white rounded-2xl border border-[#E8EDE9] p-6 space-y-4">
                <h2 className="text-base font-semibold text-[#000F11]">Preferências de Notificação</h2>
                {[
                  { label: 'Lembrete por SMS', key: 'reminderSms', checked: currentPatient.preferences.reminderSms },
                  { label: 'Lembrete por e-mail', key: 'reminderEmail', checked: currentPatient.preferences.reminderEmail },
                  { label: 'Lembrete por WhatsApp', key: 'reminderWhatsapp', checked: currentPatient.preferences.reminderWhatsapp },
                  { label: 'Novos resultados de exames disponíveis', key: 'examNotif', checked: true },
                  { label: 'Confirmação de consultas', key: 'confirmNotif', checked: true },
                  { label: 'Recomendações de retorno médico', key: 'returnNotif', checked: true },
                ].map(({ label, key, checked }) => (
                  <label key={key} className="flex items-center justify-between p-4 rounded-xl border border-[#E8EDE9] hover:bg-[#F7F6F6] cursor-pointer">
                    <span className="text-sm text-[#000F11]">{label}</span>
                    <div className="relative">
                      <input type="checkbox" defaultChecked={checked} className="sr-only peer" />
                      <div className="w-10 h-5 rounded-full bg-[#D0DDD6] peer-checked:bg-[#2CC295] transition-colors" />
                      <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
                    </div>
                  </label>
                ))}
                <Button onClick={handleSave}><Save className="w-4 h-4" /> Salvar</Button>
              </div>
            )}

            {activeSection === 'seguranca' && (
              <div className="bg-white rounded-2xl border border-[#E8EDE9] p-6 space-y-5">
                <h2 className="text-base font-semibold text-[#000F11]">Segurança</h2>
                <Field label="E-mail de acesso" defaultValue={currentPatient.email} readOnly />
                <Field label="Senha atual" defaultValue="" type="password" />
                <Field label="Nova senha" defaultValue="" type="password" />
                <Field label="Confirmar nova senha" defaultValue="" type="password" />
                <div className="p-4 bg-[#F7F6F6] rounded-xl border border-[#E8EDE9]">
                  <p className="text-sm font-semibold text-[#000F11] mb-1">Autenticação em duas etapas</p>
                  <p className="text-xs text-[#8A9390] mb-3">Proteja sua conta com uma camada extra de segurança.</p>
                  <Button variant="outline" size="sm">Ativar 2FA</Button>
                </div>
                <Button onClick={handleSave}><Save className="w-4 h-4" /> Atualizar Senha</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
