export function InstitutionalHeader() {
  return (
    <header className="metro-gradient px-8 py-4 lg:px-16 lg:py-5 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary-foreground lg:w-7 lg:h-7">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8M12 8v8" />
          </svg>
        </div>
        <div>
          <h2 className="text-primary-foreground font-display font-bold text-lg lg:text-xl tracking-tight">Metrô-DF</h2>
          <p className="text-primary-foreground/70 text-xs lg:text-sm">Bilhete Digital</p>
        </div>
      </div>
    </header>
  );
}
