import { useState } from 'react'
import ExpenseSummary from './components/ExpenseSummary'
import ExpenseList from './components/ExpenseList'
// import ExpenseForm from './components/ExpenseForm'
import ExpenseModal from './components/ExpenseModal'
import type { Expense } from './types'

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 1,
      name: 'Groceries',
      category: 'Food',
      amount: 84.32,
      date: '2026-10-25',
      description: 'Weekly grocery shopping',
    },
    {
      id: 2,
      name: 'Gas',
      category: 'Transportation',
      amount: 48.5,
      date: '2026-10-24',
      description: 'Filled up tank',
    },
    {
      id: 3,
      name: 'Restaurant',
      category: 'Food',
      amount: 36.75,
      date: '2026-10-23',
    },
  ])

  // creates state variable w initial val of false to track if form is open
  // isFormOpen: current val of the state, in this case false
  // setIsFormOpen: func that can be used to update the state
  // array destructuring unpacks the 2 values returned by useState 
  const [isFormOpen, setIsFormOpen] = useState(false)

  function handleDelete(id: number) {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== id),
    )
  }

  function handleAdd(expense: Omit<Expense, 'id'>) {
    setExpenses((currentExpenses) => [
      { ...expense, id: Date.now() },
      ...currentExpenses,
    ])

    // close new expense form
    setIsFormOpen(false)
  }

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  )

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
        />
      )}
    </main>
  )
}
