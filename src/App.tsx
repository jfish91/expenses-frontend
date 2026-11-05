import './App.css'

import { useEffect, useState } from 'react'

import ExpenseSummary from './components/ExpenseSummary'
import ExpenseList from './components/ExpenseList'
// import ExpenseForm from './components/ExpenseForm'
import ExpenseModal from './components/ExpenseModal'
import type { CreateExpenseRequest, Expense } from './types'

export default function App() {
  
  
  // manually created expenses for testing -- replaced by backend fetch
  // const [expenses, setExpenses] = useState<Expense[]>([
  //   {
  //     id: "1",
  //     vendor: 'Groceries',
  //     category: 'Food',
  //     amount: 84.32,
  //     date: '2026-10-25',
  //     description: 'Weekly grocery shopping',
  //   },
  //   {
  //     id: "2",
  //     vendor: 'Gas',
  //     category: 'Transportation',
  //     amount: 48.5,
  //     date: '2026-10-24',
  //     description: 'Filled up tank',
  //   },
  //   {
  //     id: "3",
  //     vendor: 'Restaurant',
  //     category: 'Food',
  //     amount: 36.75,
  //     date: '2026-10-23',
  //     description: 'Dinner with friends',
  //   },
  // ])

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
    async function fetchExpenses() {
      try {
        // TODO: replace hardcoded URL with environment variable
        const response = await fetch('http://localhost:8080/expenses')
        console.log("response:", response)
        if (!response.ok) {
          throw new Error('Failed to fetch expenses')
        }

        const expenses: Expense[] = await response.json()
        console.log("expenses:", expenses)
        setExpenses(expenses)

        const categoriesReponse = await fetch('http://localhost:8080/categories')
        if (!categoriesReponse.ok) {
          throw new Error('Failed to fetch categories')
        }

        const categories: string[] = await categoriesReponse.json()
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

  function handleDelete(id: string) {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== id),
    )
  }

  async function handleAdd(expense: CreateExpenseRequest) {

    try {

      const response = await fetch('http://localhost:8080/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(expense)
      })
      console.log("response:", response)
      if (!response.ok) {
        throw new Error('Failed to add expense')
      }

      const newExpense: Expense = await response.json()

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
          // onClick={() =>
          //   document.getElementById('expense-form')?.scrollIntoView({
          //     behavior: 'smooth',
          //   })
          // }
        >
          Add expense
        </button>
      </header>

      <ExpenseSummary
        total={totalExpenses}
        count={expenses.length}
      />

      {/* <ExpenseForm 
        onAdd={handleAdd}
      /> */}

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
