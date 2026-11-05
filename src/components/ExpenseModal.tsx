import ExpenseForm from './ExpenseForm'
import type { Expense } from '../types'

type ExpenseModalProps = {
  onClose: () => void
  onAdd: (expense: Omit<Expense, 'id'>) => void
}

export default function ExpenseModal({
  onClose,
  onAdd,
}: ExpenseModalProps) {
  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby="expense-modal-title"
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2
              className="modal-title fs-5"
              id="expense-modal-title"
            >
              Add an expense
            </h2>

            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            />
          </div>

          <ExpenseForm onAdd={onAdd} />
        </div>
      </div>
    </div>
  )
}