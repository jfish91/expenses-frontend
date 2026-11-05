import { useState } from 'react'              // react hook for storing anf updating component state
import type { SyntheticEvent } from 'react'   // TypeScript type for React events
import type { Expense } from '../types'       // TypeScript def of Expense

type ExpenseFormProps = {
  // onAdd: function passed into ExpenseForm, accepts one argument, an Expense
  // Omit<Expense, 'id'> means the argument is an Expense object but without the id property **handled in App.tsx**
  // void means function returns nothing
    onAdd: (expense: Omit<Expense, 'id'>) => void
}

// function ExpenseForm declares component
// export default allows other files to import it
// export default function ExpenseForm(props: ExpenseFormProps) {
//   const onAdd = props.onAdd
// { onAdd } extracts onAdd prop from the props obj 
export default function ExpenseForm({ onAdd }: ExpenseFormProps) {
  // each input must have its own state and event handler
  // 1. create state variable for each input field
  // 2. connect it to an input w value prop and onChange event handler
  // 3. update it with onChange event handler
    const [vendor, setVendor] = useState('')
    const [category, setCategory] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')

    function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault() // prevent default form submission behavior of page reload
        const newExpense = {
            vendor: vendor.trim(),
            category,
            amount: Number(amount), // convert amount from string to number
            date,
            description: description.trim(),
        }

        onAdd(newExpense)
        
        // reset form values for later
        setVendor('')
        setCategory('')
        setAmount('')
        setDate('')
        setDescription('')
    }
return (
  <div className="modal-body">
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="vendor" className="form-label">
          Vendor
        </label>
        <input
          id="vendor"
          className="form-control"
          type="text"
          value={vendor}
          onChange={(event) => setVendor(event.target.value)}
          placeholder="e.g. Groceries"
          required
        />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            id="category"
            className="form-select"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
          >
            {/* TODO: fill categories from elsewhere? from backend? */}
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Housing">Housing</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="amount" className="form-label">
            Amount ($)
          </label>
          <input
            id="amount"
            className="form-control"
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="0.00"
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="date" className="form-label">
          Date
        </label>
        <input
          id="date"
          className="form-control"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description (optional)
        </label>
        <textarea
          id="description"
          className="form-control"
          rows={2}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Add any extra details"
        />
      </div>

      <div className="modal-footer px-0 pb-0">
        <button type="submit" className="btn btn-primary">
          Save expense
        </button>
      </div>
    </form>
  </div>
)
}
