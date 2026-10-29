
// input that a parent component passes to child component
// total and count are passed as props to the ExpenseSummary component from the app 
type ExpenseSummaryProps = {
  total: number
  count: number
}

export default function ExpenseSummary({
  total,
  count,
}: ExpenseSummaryProps) {
  return (
    <section className="card summary-card">
      <div className="card-body p-4">
        <p className="summary-label">Total expenses</p>

        <p className="summary-total">
          {total.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </p>

        <p className="text-secondary mb-0 mt-2">
          {count} {count === 1 ? 'transaction' : 'transactions'}
        </p>
      </div>
    </section>
  )
}
