export function countTodos(text: string) {
  return text.split(/\r\n|\r|\n/).filter((line) => line.trim().length > 0)
    .length
}
