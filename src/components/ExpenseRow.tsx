
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
            <h3>{expense.name}</h3>
            <p>
            {expense.category} · {expense.date}
            </p>
        </div>

        <strong>
            {expense.amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            })}
        </strong>
        <button onClick={() => onDelete(expense.id)}>
            Delete
        </button>
    </article>
  )
}
