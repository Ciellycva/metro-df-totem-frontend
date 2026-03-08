import { ReactNode } from "react";

interface MobileShellProps {
  children: ReactNode;
}

export function MobileShell({ children }: MobileShellProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="metro-gradient px-4 py-3 flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary-foreground">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8M12 8v8" />
            </svg>
          </div>
          <span className="text-primary-foreground font-display font-bold text-sm">Metrô-DF</span>
        </div>
      </header>
      <main className="flex-1 flex flex-col p-4">
        {children}
      </main>
      <footer className="text-center py-3 px-4 border-t border-border">
        <p className="text-xs text-muted-foreground">Metrô-DF • Companhia do Metropolitano do Distrito Federal</p>
      </footer>
    </div>
  );
}
