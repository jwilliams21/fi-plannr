import { FiPieChart } from './FiPieChart';

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

  console.log('From FiDashboard:', { totalEndingBalance, startingAmount, totalInterest, totalContribution })
  
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
            <td>{startingAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          </tr>
          <tr>
            <td>Total Contributions</td>
            <td>{totalContribution.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          </tr>
          <tr>
            <td>Total Interest</td>
            <td>{totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          </tr>
          <tr>
            <td>End Balance</td>
            <td>{totalEndingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          </tr>
        </tbody>
      </table>

      {/* Doughnut Chart */}
      <div>
        <h2>Growth Projections</h2>
        <FiPieChart 
          totalPrincipal={startingAmount}
          totalContributions={totalContribution}
          totalGrowth={totalInterest}
        />
      </div>

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
                <td>{row.yearStartingAmt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td>{row.yearAddContribute.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td>{row.yearInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td>{row.yearEndingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

    </div>
  )
}