import type { CreateExpenseRequest, Expense } from '../types'

// service layer shouldnt manage react state
// job is to communicate w backend and return data

// TODO: replace hardcoded URL with environment variable
const API_URL = 'http://localhost:8080'

async function getExpenses(): Promise<Expense[]> {
  const response = await fetch(`${API_URL}/expenses`)
    if (!response.ok) {
      throw new Error('Failed to fetch expenses')
    }
    return response.json()
}

async function getCategories() : Promise<string[]> {
    const response = await fetch(`${API_URL}/categories`)
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    return response.json()
}

async function createExpense(expense: CreateExpenseRequest): Promise<Expense> {
    const response = await fetch(`${API_URL}/expenses`, {
        method: 'POST',
        headers: {  
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(expense)
    })
    if (!response.ok) {
        throw new Error('Failed to create expense')
    }
    return response.json()
}

async function deleteExpense(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/expenses/${id}`, {
        method: 'DELETE',
    })
    if (!response.ok) {
        throw new Error('Failed to delete expense')
    }
}


const expenseService = {
  getExpenses,
  getCategories,
  createExpense,
  deleteExpense,
}

export default expenseService