import { create } from "zustand"
import type { Todo } from "../types/todo"
import { persist } from "zustand/middleware"

type Group = {
  id: string
  title: string
}

type TodoStore = {
  todos: Todo[]
  groups: Group[]

  activeTab: "tasks" | "trash"
  setActiveTab: (tab: "tasks" | "trash") => void

  addGroup: () => string
  addTodo: (text: string, groupId: string) => void

  toggleTodo: (id: string) => void
  editTodo: (id: string, text: string) => void
  deleteTodo: (id: string) => void
  removeTodo: (id: string) => void
  restoreTodo: (id: string) => void
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      groups: [],

      activeTab: "tasks",

      setActiveTab: (tab) => set({ activeTab: tab }),
      
      addGroup: () => {
        const id = Date.now().toString()

        set((state) => ({
          groups: [
            ...state.groups,
            {
              id,
              title: `Group ${state.groups.length + 1}`
            }
          ]
        }))

        return id
      },

      addTodo: (text, groupId) => {
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: Date.now().toString(),
              text,
              completed: false,
              createdAt: Date.now(),
              isActive: true,
              groupId
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
      },

      restoreTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, isActive: true } : t
          )
        }))
      },

      removeTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter((t) => t.id !== id)
        }))
      }
    }),
    {
      name: "todo-storage"
    }
  )
)