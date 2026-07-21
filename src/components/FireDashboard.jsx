

export default function FireDashboard({ results }) {

    if(!results) {
    return (
      <div></div>
    )
    }


    // Brokerage
    const totalBrokerageEndingBalance = parseFloat(results?.[results?.length - 1].brokerageEndingBalance) || 0;
    const totalBrokerageInterest = results?.reduce((accumulator, currentAge) => {
        return accumulator + (parseFloat(currentAge.brokerageInterest)) || 0;
    }, 0) 
    const totalBrokerageContribution = results?.reduce((accumulator, currentAge) => {
        return accumulator + (parseFloat(currentAge.brokerageContribution)) || 0;
    }, 0)

    // Roth
    const totalRothEndingBalance = parseFloat(results?.[results?.length - 1].rothEndingBalance) || 0;
    const totalRothInterest = results?.reduce((accumulator, currentAge) => {
        return accumulator + (parseFloat(currentAge.rothInterest)) || 0;
    }, 0) 
    const totalRothContribution = results?.reduce((accumulator, currentAge) => {
        return accumulator + (parseFloat(currentAge.rothContribution)) || 0;
    }, 0)


    // Traditional
    const totalTraditionalEndingBalance = parseFloat(results?.[results?.length - 1].traditionalEndingBalance) || 0;
    const totalTraditionalInterest = results?.reduce((accumulator, currentAge) => {
        return accumulator + (parseFloat(currentAge.traditionalInterest)) || 0;
    }, 0) 
    const totalTraditionalContribution = results?.reduce((accumulator, currentAge) => {
        return accumulator + (parseFloat(currentAge.traditionalContribution)) || 0;
    }, 0)
    const totalTraditionalEmployerContribution = results?.reduce((accumulator, currentAge) => {
        return accumulator + (parseFloat(currentAge.traditionalEmployerContribution)) || 0;
    }, 0)


    // HSA
    const totalHsaEndingBalance = parseFloat(results?.[results?.length - 1].hsaEndingBalance) || 0;
    const totalHsaInterest = results?.reduce((accumulator, currentAge) => {
        return accumulator + (parseFloat(currentAge.hsaInterest)) || 0;
    }, 0) 
    const totalHsaContribution = results?.reduce((accumulator, currentAge) => {
        return accumulator + (parseFloat(currentAge.hsaContribution)) || 0;
    }, 0)

    // Combined Results
    const totalAfterFire = totalRothEndingBalance + totalTraditionalEndingBalance + totalHsaEndingBalance
    const rothReturnRate = results?.[results?.length - 1].rothReturnRate;
    const traditionalReturnRate = results?.[results?.length - 1].traditionalReturnRate;
    const hsaReturnRate = results?.[results?.length - 1].hsaReturnRate;
    const fireToRetire = results?.[results?.length - 1].fireToRetire;
    const fireAge = results?.[results?.length - 1].fireAge;
    const annualExpenses = results?.[results?.length - 1].annualExpenses;
    const totalFutureExpenses = results?.[results?.length - 1].totalFutureExpenses;
    const futureExpensesAtSixty = results?.[results?.length - 1].futureExpensesAtSixty;

    let runningRoth = totalRothEndingBalance;
    let runningTraditional = totalTraditionalEndingBalance;
    let runningHsa = totalHsaEndingBalance;

    for(let age = fireAge; age <= 60; age++){
        runningRoth += runningRoth * rothReturnRate;
        runningTraditional += runningTraditional * traditionalReturnRate;
        runningHsa += runningHsa * hsaReturnRate;
    }

    const totalCombinedAtSixty = runningRoth + runningTraditional + runningHsa;
    const totalRothTraditionalAtSixty = runningRoth + runningTraditional;
    const fourPercentWithdrawlAnnual = totalRothTraditionalAtSixty * 0.04;
    const expenseAtSixtyDiff = fourPercentWithdrawlAnnual - futureExpensesAtSixty


    let brokerageWithdrawlRate = 0;

    if(fireToRetire > 10) {
        brokerageWithdrawlRate = 0.07
    } else if (fireToRetire <= 10 && fireToRetire > 5) {
        brokerageWithdrawlRate = 0.09
    } else {
        brokerageWithdrawlRate = 0.12
    }

    const brokerageWithdrawlAmount = totalBrokerageEndingBalance * brokerageWithdrawlRate;
    const expenseDiff =  brokerageWithdrawlAmount - totalFutureExpenses;

    


    return (
        <div>
            <div className='w-full px-2'>
                <div>
                    <div className='w-full text-lg bg-linear-to-r from-amber-300 via-orange-500 to-red-700 text-white text-center font-bold py-1'>FIRE Results</div>
                    <div className='grid grid-cols-2 gap-2 place-items-center'>
                        <div className='font-bold'>FIRE Balance (Brokerage)</div>
                        <div className='text-center font-bold  text-white bg-sky-700 rounded-sm py-1 px-2 md:px-16 whitespace-nowrap'>$ {totalBrokerageEndingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div>Roth & Traditional & HSA {fireToRetire > 0 ? `This money has ${fireToRetire} more years to compound!` : ''}</div>
                        <div>$ {totalAfterFire.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                </div>

                <div>
                    <div className='w-full text-lg bg-linear-to-r from-amber-300 via-orange-500 to-red-700 text-white text-center font-bold py-1'>Are you ready to go FI at age {fireAge}?</div>
                    <div className='grid grid-cols-2 gap-2 place-items-center'>
                        <div>Current Annual Expenses</div>
                        <div>{annualExpenses?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div>Expenses at FIRE Age w/ inflation</div>
                        <div>{totalFutureExpenses?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div>Brokerage/Roth Contribution Withdrawl Amount Per Year</div>
                        <div>{brokerageWithdrawlAmount?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div>You have {expenseDiff >= 0 ? 'an overage' : 'a deficient'} of</div>
                        <div>{expenseDiff?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                </div>

                <div>
                    <div className='w-full text-lg bg-linear-to-r from-amber-300 via-orange-500 to-red-700 text-white text-center font-bold py-1'>What about the rest of your retirement accounts at age 60?</div>
                    <div className='grid grid-cols-2 gap-2 place-items-center'>
                        <div>By the time you reach 60, your retirement accounts will be worth a combined</div>
                        <div>{totalCombinedAtSixty?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div>Retirement account withdrawl at 4%</div>
                        <div>{fourPercentWithdrawlAnnual?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div>Future Expenses at 60</div>
                        <div>{futureExpensesAtSixty?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div>You have {expenseAtSixtyDiff >= 0 ? 'an overage' : 'a deficient'} of</div>
                        <div>{expenseAtSixtyDiff?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                </div>

                <div>
                    <div className='w-full text-lg bg-linear-to-r from-amber-300 via-orange-500 to-red-700 text-white text-center font-bold py-1'></div>
                    <div className='grid grid-cols-2 gap-2 place-items-center'>
                        <div></div>
                    </div>
                </div>

                <div>
                    <div className='w-full text-lg bg-linear-to-r from-amber-300 via-orange-500 to-red-700 text-white text-center font-bold py-1'></div>
                    <div className='grid grid-cols-2 gap-2 place-items-center'>
                        <div></div>
                    </div>
                </div>

                <div>
                    <div className='w-full text-lg bg-linear-to-r from-amber-300 via-orange-500 to-red-700 text-white text-center font-bold py-1'></div>
                    <div className='grid grid-cols-2 gap-2 place-items-center'>
                        <div></div>
                    </div>
                </div>

                <div>
                    <div className='w-full text-lg bg-linear-to-r from-amber-300 via-orange-500 to-red-700 text-white text-center font-bold py-1'></div>
                    <div className='grid grid-cols-2 gap-2 place-items-center'>
                        <div></div>
                    </div>
                </div>

                <div>
                    <div className='w-full text-lg bg-linear-to-r from-amber-300 via-orange-500 to-red-700 text-white text-center font-bold py-1'></div>
                    <div className='grid grid-cols-2 gap-2 place-items-center'>
                        <div></div>
                    </div>
                </div>
                


                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}>Brokerage Results</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Brokerage Total</td>
                            <td>{totalBrokerageEndingBalance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                        <tr>
                            <td>Total Brokerage Interest</td>
                            <td>{totalBrokerageInterest?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                        <tr>
                            <td>Total Brokerage Contributions</td>
                            <td>{totalBrokerageContribution?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                    </tbody>
                </table>

                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}>Roth Results</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Roth Total</td>
                            <td>{totalRothEndingBalance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                        <tr>
                            <td>Total Roth Interest</td>
                            <td>{totalRothInterest?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                        <tr>
                            <td>Total Roth Contributions</td>
                            <td>{totalRothContribution?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
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
                            <td>{totalTraditionalEndingBalance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                        <tr>
                            <td>Total Traditional Interest</td>
                            <td>{totalTraditionalInterest?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                        <tr>
                            <td>Total Traditional Contribution</td>
                            <td>{totalTraditionalContribution?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                        <tr>
                            <td>Total Traditional Employer Contribution</td>
                            <td>{totalTraditionalEmployerContribution?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
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
                            <td>{totalHsaEndingBalance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                        <tr>
                            <td>Total HSA Interest</td>
                            <td>{totalHsaInterest?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                        <tr>
                            <td>Total HSA Contributions</td>
                            <td>{totalHsaContribution?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


    )
}