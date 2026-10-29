
import { useState } from 'react'
import ExpenseSummary from './components/ExpenseSummary'
import ExpenseList from './components/ExpenseList'
import type { Expense } from './types'

export default function App() {

  // useState stores current list of expenses and allows for updating the list when an expense is deleted
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 1,
      name: 'Groceries',
      category: 'Food',
      amount: 84.32,
      date: '2026-10-25',
    },
    {
      id: 2,
      name: 'Gas',
      category: 'Transportation',
      amount: 48.5,
      date: '2026-10-24',
    },
    {
      id: 3,
      name: 'Restaurant',
      category: 'Food',
      amount: 36.75,
      date: '2026-10-23',
    },
  ])

  function handleDelete(id: number) {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== id),
    )
  }

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  )

  return (
    <main className="app">
      <header className="app-header">
        <h1>Expenses</h1>
        <p>Track and manage your spending.</p>
      </header>

      <ExpenseSummary
        total={totalExpenses}
        count={expenses.length}
      />

      <ExpenseList
        expenses={expenses}
        onDelete={handleDelete}
      />
    </main>
  )
}
