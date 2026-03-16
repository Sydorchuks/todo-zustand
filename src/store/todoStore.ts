import { create } from "zustand"
import type { Todo } from "../types/todo"


type TodoStore = {
  todos: Todo[]
  addTodo: (text: string) => void
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],

  addTodo: (text) => {
    const now = Date.now()
  
    const newTodo = {
      id: now.toString(),
      text,
      completed: false,
      createdAt: now,
      isActive: true
    }
  
    set((state) => ({
      todos: [...state.todos, newTodo]
    }))
  }
  
}))