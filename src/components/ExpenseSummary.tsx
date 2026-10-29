
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
    <section className="summary">
      <h2>Total expenses</h2>

      <p className="total">
        {total.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </p>

      <p>{count} transactions</p>
    </section>
  )
}
