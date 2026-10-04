import type { ReactNode } from 'react'

/** A minimal browser window around a live preview. Purely visual: nothing inside is clickable. */
export default function BrowserFrame({ url, children, className = '' }: { url: string; children: ReactNode; className?: string }) {
  return (
    <div className={`flex h-full flex-col overflow-hidden rounded-[28px] border border-white/15 bg-[#111] sm:rounded-[36px] md:rounded-[44px] ${className}`}>
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto truncate rounded-full bg-white/5 px-4 py-1 text-[11px] tracking-wide text-mist/60">{url}</span>
        <span className="w-[42px]" aria-hidden="true" />
      </div>
      <div className="cq pointer-events-none relative flex-1 select-none overflow-hidden" aria-hidden="true">
        {children}
      </div>
    </div>
  )
}
