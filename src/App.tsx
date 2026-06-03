function App() {
  return (
    <main
      className="flex h-dvh min-h-0 flex-col bg-zinc-50 text-zinc-950"
      aria-labelledby="app-title"
    >
      <section className="sr-only" aria-labelledby="app-title">
        <h1 id="app-title">alex-0d18-test-15</h1>
      </section>

      <section
        className="min-h-0 flex-1 px-4 py-4 sm:px-6 lg:px-8"
        aria-label="编辑区"
      >
        <div className="h-full rounded-md border border-zinc-200 bg-white shadow-sm">
          <div className="h-full w-full bg-[linear-gradient(to_bottom,transparent_31px,#f4f4f5_32px)] bg-[length:100%_32px]" />
        </div>
      </section>

      <footer
        className="flex h-12 shrink-0 items-center justify-between border-t border-zinc-200 bg-white px-4 text-sm text-zinc-500 sm:px-6 lg:px-8"
        aria-label="底部状态栏"
      >
        <span>alex-0d18-test-15</span>
        <span>状态栏</span>
      </footer>
    </main>
  )
}

export default App
