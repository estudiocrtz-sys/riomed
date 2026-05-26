import { Sidebar } from './Sidebar'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen bg-[#F7F6F6]">
      <Sidebar />
      <main className="flex-1 ml-64 flex flex-col min-h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
