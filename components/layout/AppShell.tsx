import { Sidebar } from './Sidebar'
import { PageTransition } from './PageTransition'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen bg-[#F7F6F6]">
      <Sidebar />
      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen overflow-y-auto pb-20 lg:pb-0">
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  )
}
