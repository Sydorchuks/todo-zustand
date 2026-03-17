import { create } from "zustand"
import type { Todo } from "../types/todo"
import { persist } from "zustand/middleware"


type TodoStore = {
  todos: Todo[]
  addTodo: (text: string) => void
  toggleTodo: (id: string) => void
  editTodo: (id: string, text: string) => void
  deleteTodo: (id: string) => void
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],

      addTodo: (text) => {
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: Date.now().toString(),
              text,
              completed: false,
              createdAt: Date.now(),
              isActive: true
            }
          ]
        }))
      },

      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? { ...todo, completed: !todo.completed }
              : todo
          )
        }))
      },

      editTodo: (id, text) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, text } : todo
          )
        }))
      },

      deleteTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, isActive: false } : todo
          )
        }))
      }
    }),
    {
      name: "todo-storage"
    }
  )
)