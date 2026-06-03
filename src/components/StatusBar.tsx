type StatusBarProps = {
  todoCount: number
}

export function StatusBar({ todoCount }: StatusBarProps) {
  return (
    <footer
      className="flex h-12 shrink-0 items-center justify-end border-t border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-600 sm:px-6 lg:px-8"
      aria-label="底部状态栏"
    >
      <span aria-live="polite">{todoCount} 条待办</span>
    </footer>
  )
}
