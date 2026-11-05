// complete expense recieved from backend
export type Expense = {
  id: string
  vendor: string
  description?: string
  amount: number
  category: string
  date: string
  createdAt?: string
}

// data sent to backend when creating a new expense
export type CreateExpenseRequest = {
  vendor: string
  description?: string
  amount: number
  category: string
  date: string
}