type StatusBarProps = {
  canClear: boolean
  onClear: () => void
  todoCount: number
}

export function StatusBar({ canClear, onClear, todoCount }: StatusBarProps) {
  return (
    <footer
      className="flex h-12 shrink-0 items-center justify-between gap-3 border-t border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-600 sm:px-6 lg:px-8"
      aria-label="底部状态栏"
    >
      <span aria-live="polite">{todoCount} 条待办</span>
      <button
        type="button"
        className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50 focus:ring-2 focus:ring-zinc-200 focus:outline-none disabled:cursor-not-allowed disabled:border-zinc-200 disabled:text-zinc-300 disabled:hover:bg-white"
        disabled={!canClear}
        onClick={onClear}
      >
        清空
      </button>
    </footer>
  )
}
