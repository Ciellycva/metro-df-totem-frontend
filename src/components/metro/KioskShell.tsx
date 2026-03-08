import { ReactNode } from "react";
import { InstitutionalHeader } from "./InstitutionalHeader";
import { InstitutionalFooter } from "./InstitutionalFooter";

interface KioskShellProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

export function KioskShell({ children, showHeader = true, showFooter = true }: KioskShellProps) {
  return (
    <div className="kiosk-container bg-background select-none overflow-hidden">
      {showHeader && <InstitutionalHeader />}
      <main className="flex-1 flex flex-col items-center justify-center px-8 py-6 lg:px-16 lg:py-10">
        {children}
      </main>
      {showFooter && <InstitutionalFooter />}
    </div>
  );
}
