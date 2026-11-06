import './App.css'

import { useEffect, useState } from 'react'

import ExpenseSummary from './components/ExpenseSummary'
import ExpenseList from './components/ExpenseList'
// import ExpenseForm from './components/ExpenseForm'
import ExpenseModal from './components/ExpenseModal'
import type { CreateExpenseRequest, Expense } from './types'

import expenseService from './services/expenseService'

export default function App() {
  

  // start w empty array b/c it will be populated by backend
  const [expenses, setExpenses] = useState<Expense[]>([])

  const [categories, setCategories] = useState<string[]>([])

  // creates state variable w initial val of false to track if form is open
  // isFormOpen: current val of the state, in this case false
  // setIsFormOpen: func that can be used to update the state
  // array destructuring unpacks the 2 values returned by useState 
  const [isFormOpen, setIsFormOpen] = useState(false)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)


  useEffect(() => {
    // get expenses from backend
    async function fetchExpenses() {
      try {
        // TODO: replace hardcoded URL with environment variable
        const expenses = await expenseService.getExpenses()
        console.log("get all expenses response:", expenses)
        setExpenses(expenses)

        const categories = await expenseService.getCategories()
        setCategories(categories)

      } catch (err) {
        console.error(err)
        setError(err instanceof Error ? 'Error fetching expenses: ' + err.message : 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchExpenses()
  }, [])

  async function handleDelete(id: string) {
    try {

      console.log("deleting expense with id:", id)
      // hit backend to delete expense based on id
      await expenseService.deleteExpense(id)
      
      // remove expense from state after successful deletion from backend
      setExpenses((currentExpenses) =>
        currentExpenses.filter((expense) => expense.id !== id),
      )


    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    }
  }

  async function handleAdd(expense: CreateExpenseRequest) {
    try {

      const newExpense: Expense = await expenseService.createExpense(expense)
      console.log("new expense:", newExpense)

      // add expense to state after successful addition to backend
      setExpenses((currentExpenses) => [
        newExpense,
        ...currentExpenses,
      ])

      // close new expense form
      setIsFormOpen(false)
    } catch(err) {
      console.error(err)
      setSubmitError(err instanceof Error ? err.message : 'An unknown error occurred')
    }
  }

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  )

if (isLoading) {
  return <div className="container mt-4">Loading expenses...</div>
}

if (error) {
  return <div className="container mt-4 alert alert-danger">{error}</div>
}

  return (
    <main className="app container">
      <header className="app-header d-flex justify-content-between align-items-center gap-3">
        <div>
          <h1>Expenses</h1>
          <p>Track and manage your spending.</p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          // on clicking button, trigger setIsFormOpen func
          onClick={() => setIsFormOpen(true)}
        >
          Add expense
        </button>
      </header>

      <ExpenseSummary
        total={totalExpenses}
        count={expenses.length}
      />

      {submitError && (
        <div className="alert alert-danger mt-3">
          {submitError}
        </div>
      )}

      <ExpenseList
        expenses={expenses}
        onDelete={handleDelete}
      />

      {/* logic for showing and hiding form 
      if condition is true --> render component, if false --> dont render */}
      {isFormOpen && (
        <ExpenseModal
          onClose={() => setIsFormOpen(false)}
          onAdd={handleAdd}
          categories={categories}
        />
      )}
    </main>
  )
}
