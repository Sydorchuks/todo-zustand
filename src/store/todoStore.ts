import { create } from "zustand"
import type { Todo } from "../types/todo"


type TodoStore = {
  todos: Todo[]
  addTodo: (text: string) => void
  toggleTodo: (id: string) => void
  editTodo: (id: string, text: string) => void
  deleteTodo: (id: string) => void
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
  },

  toggleTodo: (id) => {
    set((state) => {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id !== id) return todo
  
        return {
          ...todo,
          completed: !todo.completed
        }
      })
  
      return { todos: updatedTodos }
    })
  },

  editTodo: (id, text) => {
    set((state) => {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id !== id) return todo
  
        return {
          ...todo,
          text
        }
      })
  
      return { todos: updatedTodos }
    })
  },

  deleteTodo: (id) => {
    set((state) => {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id !== id) return todo
  
        return {
          ...todo,
          isActive: false
        }
      })
  
      return { todos: updatedTodos }
    })
  }
  
}))