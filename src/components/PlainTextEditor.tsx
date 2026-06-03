import type { ChangeEvent } from 'react'

type PlainTextEditorProps = {
  value: string
  onChange: (value: string) => void
}

export function PlainTextEditor({ value, onChange }: PlainTextEditorProps) {
  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    onChange(event.target.value)
  }

  return (
    <textarea
      aria-label="待办文本"
      className="h-full w-full resize-none rounded-md border border-zinc-200 bg-white px-4 py-3 font-mono text-base leading-8 text-zinc-950 shadow-sm transition outline-none placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 sm:px-5 sm:py-4"
      placeholder="每行一条待办"
      spellCheck={false}
      value={value}
      onChange={handleChange}
    />
  )
}
