'use client'

import { useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/ToastProvider'
import { currentPatient } from '@/data/patient'
import { STORAGE_KEYS, usePersistentState } from '@/lib/local-storage'
import { Save, User, Shield, Bell, Heart, Phone, Lock, ChevronDown } from 'lucide-react'

const sections = [
  { id: 'dados', label: 'Dados Pessoais', icon: User },
  { id: 'saude', label: 'Informações de Saúde', icon: Heart },
  { id: 'convenio', label: 'Convênio', icon: Shield },
  { id: 'emergencia', label: 'Contato de Emergência', icon: Phone },
  { id: 'notificacoes', label: 'Preferências', icon: Bell },
  { id: 'seguranca', label: 'Segurança', icon: Lock },
]

const genderOptions = ['Feminino', 'Masculino']
const maritalStatusOptions = ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Divorciada', 'Viúvo(a)']
const bloodTypeOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
const stateOptions = ['RJ', 'SP', 'MG', 'ES']
const relationOptions = ['Cônjuge', 'Pai/Mãe', 'Irmão', 'Irmão/Irmã', 'Filho(a)', 'Amigo(a)', 'Outro']

type PatientProfile = Omit<typeof currentPatient, 'allergies' | 'chronicConditions' | 'medications'> & {
  allergies: string[]
  chronicConditions: string[]
  medications: string[]
}

function Field({ label, value, onChange, type = 'text', readOnly = false }: { label: string; value: string; onChange?: (value: string) => void; type?: string; readOnly?: boolean }) {
  return (
    <div>
      <label className="text-xs font-semibold text-[#8A9390] uppercase tracking-wide">{label}</label>
      <input
        type={type}
        readOnly={readOnly}
        {...(onChange
          ? { value, onChange: (event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value) }
          : { defaultValue: value })}
        className={`mt-1.5 w-full px-3 py-2.5 rounded-xl border text-sm transition-all ${
          readOnly
            ? 'bg-[#F7F6F6] border-[#E8EDE9] text-[#8A9390] cursor-not-allowed'
            : 'bg-white border-[#D0DDD6] text-[#000F11] focus:outline-none focus:ring-2 focus:ring-[#2CC295]/30 focus:border-[#2CC295]'
        }`}
      />
    </div>
  )
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <div>
      <label className="text-xs font-semibold text-[#8A9390] uppercase tracking-wide">{label}</label>
      <div className="relative mt-1.5">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none px-3 py-2.5 pr-10 rounded-xl border border-[#D0DDD6] bg-white text-sm text-[#000F11] transition-all focus:outline-none focus:ring-2 focus:ring-[#2CC295]/30 focus:border-[#2CC295]"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A9390]" />
      </div>
    </div>
  )
}

export default function PerfilPage() {
  const [activeSection, setActiveSection] = useState('dados')
  const [saved, setSaved] = useState(false)
  const [patient, setPatient] = usePersistentState<PatientProfile>(STORAGE_KEYS.patient, currentPatient)
  const { showToast } = useToast()

  function updatePatient<K extends keyof PatientProfile>(key: K, value: PatientProfile[K]) {
    setPatient((current) => ({ ...current, [key]: value }))
  }

  function updateEmergencyContact(key: keyof PatientProfile['emergencyContact'], value: string) {
    setPatient((current) => ({
      ...current,
      emergencyContact: { ...current.emergencyContact, [key]: value },
    }))
  }

  function updatePreference(key: keyof PatientProfile['preferences'], value: boolean | string) {
    setPatient((current) => ({
      ...current,
      preferences: { ...current.preferences, [key]: value },
    }))
  }

  function handleSave() {
    setSaved(true)
    showToast({
      title: 'Alterações salvas',
      description: 'Suas informações foram atualizadas neste navegador.',
    })
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <AppShell>
      <Header title="Meu Perfil" subtitle="Gerencie suas informações pessoais" />
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar nav */}
          <div className="space-y-1">
            {/* Avatar */}
            <div className="flex flex-col items-center p-5 bg-white rounded-2xl border border-[#E8EDE9] mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2CC295] to-[#03624C] flex items-center justify-center text-white text-2xl font-bold mb-3">
                FA
              </div>
              <p className="text-sm font-bold text-[#000F11]">{patient.name}</p>
              <p className="text-xs text-[#2CC295] font-medium">{patient.insurance}</p>
              <p className="text-[10px] text-[#8A9390] mt-0.5">Paciente desde {patient.patientSince}</p>
              <button className="mt-3 text-xs text-[#03624C] font-medium hover:text-[#2CC295] transition-colors">
                Alterar foto
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:block lg:space-y-1">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 lg:px-4 lg:py-3 rounded-xl text-sm font-medium transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2CC295]/50 ${
                  activeSection === id ? 'bg-[#03624C] text-white' : 'text-[#8A9390] hover:bg-white hover:text-[#000F11]'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />{label}
              </button>
            ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeSection === 'dados' && (
              <div className="bg-white rounded-2xl border border-[#E8EDE9] p-6 space-y-5">
                <h2 className="text-base font-semibold text-[#000F11]">Dados Pessoais</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Nome completo" value={patient.name} onChange={(value) => updatePatient('name', value)} />
                  <Field label="CPF" value={patient.cpf} readOnly />
                  <Field label="Data de nascimento" value={patient.birthDate} onChange={(value) => updatePatient('birthDate', value)} type="date" />
                  <SelectField label="Gênero" value={patient.gender} onChange={(value) => updatePatient('gender', value)} options={genderOptions} />
                  <SelectField label="Estado civil" value={patient.maritalStatus} onChange={(value) => updatePatient('maritalStatus', value)} options={maritalStatusOptions} />
                  <Field label="Telefone" value={patient.phone} onChange={(value) => updatePatient('phone', value)} type="tel" />
                  <Field label="E-mail" value={patient.email} onChange={(value) => updatePatient('email', value)} type="email" />
                  <Field label="CEP" value={patient.cep} onChange={(value) => updatePatient('cep', value)} />
                </div>
                <Field label="Endereço completo" value={patient.address} onChange={(value) => updatePatient('address', value)} />
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Cidade" value={patient.city} onChange={(value) => updatePatient('city', value)} />
                  <SelectField label="Estado" value={patient.state} onChange={(value) => updatePatient('state', value)} options={stateOptions} />
                </div>
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4" /> {saved ? 'Salvo!' : 'Salvar Alterações'}
                </Button>
              </div>
            )}

            {activeSection === 'saude' && (
              <div className="bg-white rounded-2xl border border-[#E8EDE9] p-6 space-y-5">
                <h2 className="text-base font-semibold text-[#000F11]">Informações de Saúde</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <SelectField label="Tipo sanguíneo" value={patient.bloodType} onChange={(value) => updatePatient('bloodType', value)} options={bloodTypeOptions} />
                  <Field
                    label="Alergias"
                    value={patient.allergies.join(', ') || 'Nenhuma'}
                    onChange={(value) => updatePatient('allergies', value === 'Nenhuma' ? [] : value.split(',').map((item) => item.trim()).filter(Boolean))}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#8A9390] uppercase tracking-wide">Condições crônicas</label>
                  <textarea
                    value={patient.chronicConditions.join('\n')}
                    onChange={(event) => updatePatient('chronicConditions', event.target.value.split('\n').map((item) => item.trim()).filter(Boolean))}
                    rows={3}
                    className="mt-1.5 w-full px-3 py-2.5 rounded-xl border border-[#D0DDD6] text-sm text-[#000F11] focus:outline-none focus:ring-2 focus:ring-[#2CC295]/30 focus:border-[#2CC295] resize-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#8A9390] uppercase tracking-wide">Medicamentos em uso</label>
                  <textarea
                    value={patient.medications.join('\n')}
                    onChange={(event) => updatePatient('medications', event.target.value.split('\n').map((item) => item.trim()).filter(Boolean))}
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
                  <p className="text-xl font-bold">{patient.name}</p>
                  <p className="text-[#2CC295] font-semibold mt-1">{patient.insurance}</p>
                  <p className="text-sm text-white/60 mt-3 font-mono">{patient.insuranceNumber}</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <SelectField label="Plano" value={patient.insurance} onChange={(value) => updatePatient('insurance', value)} options={['Saúde Premium', 'Bradesco Saúde', 'Amil', 'SulAmérica', 'Particular']} />
                  <Field label="Número do cartão" value={patient.insuranceNumber} readOnly />
                </div>
                <Button onClick={handleSave}><Save className="w-4 h-4" /> Salvar</Button>
              </div>
            )}

            {activeSection === 'emergencia' && (
              <div className="bg-white rounded-2xl border border-[#E8EDE9] p-6 space-y-5">
                <h2 className="text-base font-semibold text-[#000F11]">Contato de Emergência</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Nome" value={patient.emergencyContact.name} onChange={(value) => updateEmergencyContact('name', value)} />
                  <SelectField label="Relação" value={patient.emergencyContact.relation} onChange={(value) => updateEmergencyContact('relation', value)} options={relationOptions} />
                  <Field label="Telefone" value={patient.emergencyContact.phone} onChange={(value) => updateEmergencyContact('phone', value)} type="tel" />
                </div>
                <Button onClick={handleSave}><Save className="w-4 h-4" /> Salvar</Button>
              </div>
            )}

            {activeSection === 'notificacoes' && (
              <div className="bg-white rounded-2xl border border-[#E8EDE9] p-6 space-y-4">
                <h2 className="text-base font-semibold text-[#000F11]">Preferências de Notificação</h2>
                {[
                  { label: 'Lembrete por SMS', key: 'reminderSms' as const, checked: patient.preferences.reminderSms },
                  { label: 'Lembrete por e-mail', key: 'reminderEmail' as const, checked: patient.preferences.reminderEmail },
                  { label: 'Lembrete por WhatsApp', key: 'reminderWhatsapp' as const, checked: patient.preferences.reminderWhatsapp },
                  { label: 'Novos resultados de exames disponíveis', key: 'examNotif', checked: true },
                  { label: 'Confirmação de consultas', key: 'confirmNotif', checked: true },
                  { label: 'Recomendações de retorno médico', key: 'returnNotif', checked: true },
                ].map(({ label, key, checked }) => (
                  <label key={key} className="flex items-center justify-between p-4 rounded-xl border border-[#E8EDE9] hover:bg-[#F7F6F6] cursor-pointer">
                    <span className="text-sm text-[#000F11]">{label}</span>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(event) => {
                          if (key in patient.preferences) updatePreference(key as keyof PatientProfile['preferences'], event.target.checked)
                        }}
                        className="sr-only peer"
                      />
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
                <Field label="E-mail de acesso" value={patient.email} readOnly />
                <Field label="Senha atual" value="" type="password" />
                <Field label="Nova senha" value="" type="password" />
                <Field label="Confirmar nova senha" value="" type="password" />
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
