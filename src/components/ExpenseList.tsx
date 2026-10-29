
import type { Expense } from '../types'
import ExpenseRow from './ExpenseRow'

type ExpenseListProps = {
  expenses: Expense[]
  onDelete: (id: number) => void
}

// creates an array and renders a list of ExpenseRow components for each expense in the array

export default function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  return (
    <section className="expense-section">
      <h2>Recent expenses</h2>

      {expenses.length === 0 ? (
        <p className="text-secondary">
          No expenses yet. Add your first expense above.
        </p>
      ) : (
        <div className="expense-list">
          {expenses.map((expense) => (
            <ExpenseRow
              key={expense.id}
              expense={expense}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  )
}
