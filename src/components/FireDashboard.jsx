

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
                    <div className='w-full text-lg bg-emerald-500 text-white text-center font-bold py-1'>FIRE Results</div>
                    <div className='grid grid-cols-2 gap-2 place-items-center pt-2 pb-4'>
                        <div className='w-full text-left font-bold pl-1'>FIRE Balance (Brokerage)</div>
                        <div className='font-bold  text-white bg-sky-700 rounded-sm py-1 px-2 md:px-16 whitespace-nowrap'>$ {totalBrokerageEndingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='w-full text-left pl-1'>Roth & Traditional & HSA {fireToRetire > 0 ? `This money has ${fireToRetire} more years to compound!` : ''}</div>
                        <div>$ {totalAfterFire.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                </div>

                <div>
                    <div className='w-full text-lg bg-emerald-500 text-white text-center font-bold py-1'>Are you ready to go FI at age {fireAge}?</div>
                    <div className='grid grid-cols-2 gap-2 place-items-center pt-2 pb-4'>
                        <div className='w-full text-left pl-1'>Current Annual Expenses</div>
                        <div>{annualExpenses?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='w-full text-left pl-1'>Expenses at FIRE Age w/ inflation</div>
                        <div>{totalFutureExpenses?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='w-full text-left pl-1'>Brokerage/Roth Contribution Withdrawl Amount Per Year</div>
                        <div>{brokerageWithdrawlAmount?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='w-full text-left pl-1'>You have {expenseDiff >= 0 ? 'an overage' : 'a deficient'} of</div>
                        <div>{expenseDiff?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                </div>

                <div>
                    <div className='w-full text-lg bg-emerald-500 text-white text-center font-bold py-1'>Retirement accounts at age 60</div>
                    <div className='grid grid-cols-2 gap-2 place-items-center pt-2 pb-4'>
                        <div className='w-full text-left pl-1'>By the time you reach 60, your retirement accounts will be worth a combined</div>
                        <div>{totalCombinedAtSixty?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='w-full text-left pl-1'>Retirement account withdrawl at 4%</div>
                        <div>{fourPercentWithdrawlAnnual?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='w-full text-left pl-1'>Future Expenses at 60</div>
                        <div>{futureExpensesAtSixty?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='w-full text-left pl-1'>You have {expenseAtSixtyDiff >= 0 ? 'an overage' : 'a deficient'} of</div>
                        <div>{expenseAtSixtyDiff?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                </div>

                <div>
                    <div className='w-full text-lg bg-emerald-500 text-white text-center font-bold py-1'>Brokerage Results</div>
                    <div className='grid grid-cols-2 gap-2 place-items-center pt-2 pb-4'>
                        <div className='w-full font-bold text-left pl-1'>Brokerage Total</div>
                        <div>{totalBrokerageEndingBalance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='w-full text-left pl-1'>Total Brokerage Interest</div>
                        <div>{totalBrokerageInterest?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='w-full text-left pl-1'>Total Brokerage Contributions</div>
                        <div>{totalBrokerageContribution?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                </div>

                <div>
                    <div className='w-full text-lg bg-emerald-500 text-white text-center font-bold py-1'>Roth Results</div>
                    <div className='grid grid-cols-2 gap-2 place-items-center pt-2 pb-4'>
                        <div className='w-full font-bold text-left pl-1'>Roth Total</div>
                        <div>{totalRothEndingBalance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='w-full text-left pl-1'>Total Roth Interest</div>
                        <div>{totalRothInterest?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='w-full text-left pl-1'>Total Roth Contributions</div>
                        <div>{totalRothContribution?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                </div>

                <div>
                    <div className='w-full text-lg bg-emerald-500 text-white text-center font-bold py-1'>Traditional Results</div>
                    <div className='grid grid-cols-2 gap-2 place-items-center pt-2 pb-4'>
                        <div className='w-full font-bold text-left pl-1'>Traditional Total</div>
                        <div>{totalTraditionalEndingBalance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='w-full text-left pl-1'>Total Traditional Interest</div>
                        <div>{totalTraditionalInterest?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='w-full text-left pl-1'>Total Traditional Contributions</div>
                        <div>{totalTraditionalContribution?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='w-full text-left pl-1'>Total Traditional Employer Contribution</div>
                        <div>{totalTraditionalEmployerContribution?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                </div>
                <div>
                    <div className='w-full text-lg bg-emerald-500 text-white text-center font-bold py-1'>HSA Results</div>
                    <div className='grid grid-cols-2 gap-2 place-items-center pt-2 pb-4'>
                        <div className='w-full font-bold text-left pl-1'>HSA Total</div>
                        <div>{totalHsaEndingBalance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='w-full text-left pl-1'>Total HSA Interest</div>
                        <div>{totalHsaInterest?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='w-full text-left pl-1'>Total HSA Contributions</div>
                        <div>{totalHsaContribution?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                </div>
            </div>
        </div>


    )
}