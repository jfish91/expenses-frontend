
import type { Expense } from '../types'

type ExpenseRowProps = {
  expense: Expense
  onDelete: (id: number) => void
}

// receives one expense object as a prop and displays the expense information in a row format
export default function ExpenseRow({ expense, onDelete }: ExpenseRowProps) {
  return (
    <article className="expense-row">
      <div>
        <p className="expense-name">{expense.name}</p>
        <p className="expense-details">
          {expense.category} · {expense.date}
        </p>
     </div>

      <div className="expense-actions">
        <p className="expense-amount">
          {expense.amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </p>

        <button
          type="button"
          className="btn btn-outline-danger btn-sm"
          onClick={() => onDelete(expense.id)}
        >
          Delete
        </button>
      </div>
    </article>
  )
}
