export type Todo = {
    id: string
    text: string
    completed: boolean
    createdAt: number
    isActive: boolean // is it deleted or not
    groupId: string
  }