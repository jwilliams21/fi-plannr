

export default function FireDashboard({ results }) {

    if(!results) {
        return (
        <div>
            <h2>Calculate your success above!</h2>
        </div>
        )
    }

    // Brokerage
    const totalBrokerageEndingBalance = parseFloat(results[results.length - 1].brokerageEndingBalance) || 0;
    const totalBrokerageInterest = results.reduce((accumulator, currentAge) => {
        return accumulator + (parseFloat(currentAge.brokerageInterest)) || 0;
    }, 0) 
    const totalBrokerageContribution = results.reduce((accumulator, currentAge) => {
        return accumulator + (parseFloat(currentAge.brokerageContribution)) || 0;
    }, 0)

    // Roth
    const totalRothEndingBalance = parseFloat(results[results.length - 1].rothEndingBalance) || 0;
    const totalRothInterest = results.reduce((accumulator, currentAge) => {
        return accumulator + (parseFloat(currentAge.rothInterest)) || 0;
    }, 0) 
    const totalRothContribution = results.reduce((accumulator, currentAge) => {
        return accumulator + (parseFloat(currentAge.rothContribution)) || 0;
    }, 0)
    const totalRothRemoveContribution = (totalRothEndingBalance - totalRothContribution) - results[results.length - 1].startingRoth;


    // Traditional
    const totalTraditionalEndingBalance = parseFloat(results[results.length - 1].traditionalEndingBalance) || 0;
    const totalTraditionalInterest = results.reduce((accumulator, currentAge) => {
        return accumulator + (parseFloat(currentAge.traditionalInterest)) || 0;
    }, 0) 
    const totalTraditionalContribution = results.reduce((accumulator, currentAge) => {
        return accumulator + (parseFloat(currentAge.traditionalContribution)) || 0;
    }, 0)
    const totalTraditionalEmployerContribution = results.reduce((accumulator, currentAge) => {
        return accumulator + (parseFloat(currentAge.traditionalEmployerContribution)) || 0;
    }, 0)


    // HSA
    const totalHsaEndingBalance = parseFloat(results[results.length - 1].hsaEndingBalance) || 0;
    const totalHsaInterest = results.reduce((accumulator, currentAge) => {
        return accumulator + (parseFloat(currentAge.hsaInterest)) || 0;
    }, 0) 
    const totalHsaContribution = results.reduce((accumulator, currentAge) => {
        return accumulator + (parseFloat(currentAge.hsaContribution)) || 0;
    }, 0)

    // Combined Results
    const totalFire = totalBrokerageEndingBalance + totalRothContribution;
    const totalAfterFire = totalRothRemoveContribution + totalTraditionalEndingBalance + totalHsaEndingBalance


    const fireToRetire = results[results.length - 1].fireToRetire;
    const fireAge = results[results.length - 1].fireAge;
    const annualExpenses = results[results.length - 1].annualExpenses;
    const totalFutureExpenses = results[results.length - 1].totalFutureExpenses;


    return (
        <div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}>FIRE Results</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>FIRE Balance (Brokerage & Roth Contributions)</td>
                            <td>{totalFire.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                        <tr>
                            <td>
                                Money After 59 1/2 (Roth Starting Amount & Roth Interest & Traditional & HSA)
                                {fireToRetire > 0 ? `This money has ${fireToRetire} more years to compound!` : ''}
                            </td>
                            <td>{totalAfterFire.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <thead>
                        <tr>
                            <th>Are you ready to go FI at {fireAge}?</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Current Annual Expenses</td>
                            <td>{annualExpenses}</td>
                        </tr>
                        <tr>
                            <td>Expenses at FIRE Age w/ inflation</td>
                            <td>{totalFutureExpenses}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}>Brokerage Results</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Brokerage Total</td>
                            <td>{totalBrokerageEndingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                        <tr>
                            <td>Total Brokerage Interest</td>
                            <td>{totalBrokerageInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                        <tr>
                            <td>Total Brokerage Contributions</td>
                            <td>{totalBrokerageContribution.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}>Roth Results</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Roth Total</td>
                            <td>{totalRothEndingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                        <tr>
                            <td>Total Roth Interest</td>
                            <td>{totalRothInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                        <tr>
                            <td>Total Roth Contributions</td>
                            <td>{totalRothContribution.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}>Traditional Results</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Traditional Total</td>
                            <td>{totalTraditionalEndingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                        <tr>
                            <td>Total Traditional Interest</td>
                            <td>{totalTraditionalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                        <tr>
                            <td>Total Traditional Contribution</td>
                            <td>{totalTraditionalContribution.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                        <tr>
                            <td>Total Traditional Employer Contribution</td>
                            <td>{totalTraditionalEmployerContribution.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}>HSA Results</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>HSA Total</td>
                            <td>{totalHsaEndingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                        <tr>
                            <td>Total HSA Interest</td>
                            <td>{totalHsaInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                        <tr>
                            <td>Total HSA Contributions</td>
                            <td>{totalHsaContribution.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


    )
}