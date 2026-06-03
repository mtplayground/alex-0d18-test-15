import { PlainTextEditor } from './components/PlainTextEditor'
import { StatusBar } from './components/StatusBar'
import { useLocalStorage } from './hooks/useLocalStorage'
import { countTodos } from './lib/countTodos'

const TODOS_STORAGE_KEY = 'todos:text'

function App() {
  const [todosText, setTodosText] = useLocalStorage(TODOS_STORAGE_KEY, '', {
    debounceMs: 300,
  })
  const todoCount = countTodos(todosText)

  return (
    <main
      className="flex h-dvh min-h-0 flex-col bg-zinc-50 text-zinc-950"
      aria-labelledby="app-title"
    >
      <section className="sr-only" aria-labelledby="app-title">
        <h1 id="app-title">待办编辑器</h1>
      </section>

      <section
        className="min-h-0 flex-1 px-4 py-4 sm:px-6 lg:px-8"
        aria-label="编辑区"
      >
        <PlainTextEditor value={todosText} onChange={setTodosText} />
      </section>

      <StatusBar todoCount={todoCount} />
    </main>
  )
}

export default App
