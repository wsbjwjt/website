'use client'

import { ThemeProvider } from './theme-provider'
import { TailwindIndicator } from './tailwind-indicator'
import { TerminalSearch } from './TerminalSearch'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <TailwindIndicator />
        <TerminalSearch />
      </ThemeProvider>
    </>
  )
}
