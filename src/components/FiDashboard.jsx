

export default function FiDashboard({ results }) {

  if(!results) {
    return (
      <div>
        <h2>Calculate your success above!</h2>
      </div>
    )
  }

  const totalEndingBalance = results[results.length-1].yearEndingBalance;
  const startingAmount = results[0].yearStartingAmt;

  const totalInterest = results.reduce((accumulator, currentYear) => {
    return accumulator + currentYear.yearInterest;
  }, 0)

  const totalContribution = results.reduce((accumulator, currentYear) => {
    return accumulator + currentYear.yearAddContribute;
  }, 0)
  
  return (
    <div>
      {/* Top Line Results */}
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Results</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Starting Amount</td>
            <td>{startingAmount}</td>
          </tr>
          <tr>
            <td>Total Contributions</td>
            <td>{totalContribution}</td>
          </tr>
          <tr>
            <td>Total Interest</td>
            <td>{totalInterest}</td>
          </tr>
          <tr>
            <td>End Balance</td>
            <td>{totalEndingBalance}</td>
          </tr>
        </tbody>
      </table>

      {/* Accumulation Table */}
      <table>
        <thead>
          <tr>
            <th>Accumulation Schedule</th>
          </tr>
          <tr>
            <td>Year</td>
            <td>Starting Amount</td>
            <td>Total Contributions</td>
            <td>Total Interest</td>
            <td>Ending Balance</td>
          </tr>
        </thead>
        <tbody>
          {results.map((row) => {
            return (
              <tr key={row.year}>
                <td>{row.year}</td>
                <td>{row.yearStartingAmt}</td>
                <td>{row.yearAddContribute}</td>
                <td>{row.yearInterest}</td>
                <td>{row.yearEndingBalance}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

    </div>
  )
}