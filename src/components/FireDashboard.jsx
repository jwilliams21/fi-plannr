import LabelInfo from './LabelInfo';

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

    const brokerageWithdrawlRateContent = (
        <ul>
            <li>
                If less than 10 years until age 60, then 7% of the portfolio
            </li>
            <li>
                If less than 10 years, but greater than 5 years until age 60, then 9% of the portfolio
            </li>
            <li>
                If less than 5 years, then 12% of the portfolio
            </li>
        </ul>
    )

    


    return (
        <div>
            <div className='w-full px-2'>
                <div>
                    <div className='w-full text-lg bg-emerald-600 text-white text-center font-bold py-1'>
                        FIRE Results
                    </div>
                    <div className='grid grid-cols-[25px_2fr_1fr] place-items-center gap-2 pt-2 pb-4 pl-2'>
                        <div>
                            <LabelInfo 
                            label='FIRE Balance'
                            description='Total Brokerage Balance At FIRE Age'
                            variant='result'
                            />
                        </div>
                        <div className='w-full text-left font-bold pl-1'>FIRE Balance</div>
                        <div className='font-bold text-white bg-sky-700 rounded-sm py-1 px-2 md:px-4 lg:w-1/4 text-center whitespace-nowrap'>$ {totalBrokerageEndingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div>
                            <LabelInfo 
                            label='After-FIRE Funds'
                            description={`These include your Roth, Traditional, & HSA.  You will not have access to these until age 59 1/2.  That means this money has ${fireToRetire} more years to compound!`}
                            variant='result'
                            />
                        </div>
                        <div className='w-full text-left pl-1'>After-FIRE Funds</div>
                        <div>$ {totalAfterFire.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                </div>

                <div>
                    <div className='w-full text-lg bg-emerald-600 text-white text-center font-bold py-1'>Are you ready to be FI at age {fireAge}?</div>
                    <div className='grid grid-cols-[25px_1.8fr_1.2fr] gap-2 place-items-center pt-2 pb-4 pl-2'>
                        <div>
                            <LabelInfo 
                            label='Current Annual Expenses'
                            description='These are the annual expenses you noted in the filters above'
                            variant='result'
                            />
                        </div>
                        <div className='w-full text-left pl-1'>Annual Expenses</div>
                        <div>$ {annualExpenses?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div>
                            <LabelInfo 
                            label='Future Expenses'
                            description='These are your projected annual expenses at your FIRE age using a 3% inflation rate per year'
                            variant='result'
                            />
                        </div>
                        <div className='w-full text-left pl-1'>Future Expenses at {fireAge}</div>
                        <div>$ {totalFutureExpenses?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div>
                            <LabelInfo 
                            label='Annual Withdrawl'
                            description={`This is how much your able to take from your brokerage account based on the number of years left until age 60.  
                            ${brokerageWithdrawlRateContent}`}
                            variant='result'
                            />
                        </div>
                        <div className='w-full text-left pl-1'>Annual Withdrawl</div>
                        <div>$ {brokerageWithdrawlAmount?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div>
                            <LabelInfo 
                            label='Overage or Deficient'
                            description='Are you able to sustain your lifestyle and cover your expenses?'
                            variant='result'
                            />
                        </div>
                        <div className='w-full text-left pl-1'>Annual {expenseDiff >= 0 ? 'overage' : 'deficient'}</div>
                        <div className={`text-white rounded-sm py-1 px-2 font-bold  ${expenseAtSixtyDiff >=0 ? 'bg-emerald-600' : 'bg-rose-600'}`}>
                            $ {expenseDiff?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                    </div>
                </div>

                <div>
                    <div className='w-full text-lg bg-emerald-600 text-white text-center font-bold py-1'>Retirement accounts at age 60</div>
                    <div className='grid grid-cols-[25px_1.8fr_1.2fr] gap-2 place-items-center pt-2 pb-4 pl-2'>
                        <div>
                            <LabelInfo 
                            label='Balance'
                            description='How much are your accounts worth at age 60?'
                            variant='result'
                            />
                        </div>
                        <div className='w-full text-left pl-1'>Balance</div>
                        <div>$ {totalCombinedAtSixty?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div>
                            <LabelInfo 
                            label='Account Withdrawl'
                            description='Retirement account withdrawl at 4%'
                            variant='result'
                            />
                        </div>
                        <div className='w-full text-left pl-1'>Account Withdrawl</div>
                        <div>$ {fourPercentWithdrawlAnnual?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div>
                            <LabelInfo 
                            label='Expenses at 60'
                            description='What are your annual expenses once you reach 60 years old?'
                            variant='result'
                            />
                        </div>
                        <div className='w-full text-left pl-1'>Future Expenses at 60</div>
                        <div>$ {futureExpensesAtSixty?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div>
                            <LabelInfo 
                            label='Ahead or Behind?'
                            description='What is the delta between your withdrawl amount and future expenses?'
                            variant='result'
                            />
                        </div>
                        <div className={`${expenseAtSixtyDiff > 9999 ? 'w-full' : 'w-full'} text-left pl-1`}>Annual {expenseDiff >= 0 ? 'overage' : 'deficient'}</div>
                        <div className={`text-white rounded-sm py-1 px-2 font-bold  ${expenseAtSixtyDiff >=0 ? 'bg-emerald-600' : 'bg-rose-600'}`}>
                            $ {expenseAtSixtyDiff?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                    </div>
                </div>

                <div>
                    <div className='w-full text-lg bg-emerald-600 text-white text-center font-bold py-1'>Brokerage Results</div>
                    <div className='grid grid-cols-[2fr_1fr] gap-2 pl-2 pt-2 pb-4'>
                        <div className='font-bold text-left my-auto'>Brokerage Balance</div>
                        <div className='lg:w-1/4 lg:px-0 mx-auto font-bold text-center px-2 text-white bg-sky-700 rounded-sm py-1 whitespace-nowrap'>$ {totalBrokerageEndingBalance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='text-left'>Brokerage Interest</div>
                        <div className='text-center'>$ {totalBrokerageInterest?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='text-left'>Brokerage Contributions</div>
                        <div className='text-center'>$ {totalBrokerageContribution?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                </div>

                <div>
                    <div className='w-full text-lg bg-emerald-600 text-white text-center font-bold py-1'>Roth Results</div>
                    <div className='grid grid-cols-[2fr_1fr] gap-2 pl-2 pt-2 pb-4'>
                        <div className='font-bold text-left my-auto'>Roth Balance</div>
                        <div className='lg:w-1/4 mx-auto px-2 font-bold text-center text-white bg-sky-700 rounded-sm py-1 whitespace-nowrap'>$ {totalRothEndingBalance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='text-left'>Roth Interest</div>
                        <div className='text-center'>$ {totalRothInterest?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='text-left'>Roth Contributions</div>
                        <div className='text-center'>$ {totalRothContribution?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                </div>

                <div>
                    <div className='w-full text-lg bg-emerald-600 text-white text-center font-bold py-1'>Traditional Results</div>
                    <div className='grid grid-cols-[2fr_1fr] gap-2 pl-2 pt-2 pb-4'>
                        <div className='font-bold text-left my-auto'>Traditional Balance</div>
                        <div className='mx-auto px-2 font-bold text-center text-white bg-sky-700 rounded-sm py-1 whitespace-nowrap'>$ {totalTraditionalEndingBalance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='text-left'>Traditional Interest</div>
                        <div className='text-center'>$ {totalTraditionalInterest?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='text-left'>Traditional Contributions</div>
                        <div className='text-center'>$ {totalTraditionalContribution?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='text-left'>Traditional Employer Contribution</div>
                        <div className='text-center'>$ {totalTraditionalEmployerContribution?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                </div>
                <div>
                    <div className='w-full text-lg bg-emerald-600 text-white text-center font-bold py-1'>HSA Results</div>
                    <div className='grid grid-cols-[2fr_1fr] gap-2 pl-2 pt-2 pb-4'>
                        <div className='font-bold text-left my-auto'>HSA Balance</div>
                        <div className='mx-auto px-2 font-bold text-center text-white bg-sky-700 rounded-sm py-1 whitespace-nowrap'>$ {totalHsaEndingBalance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='text-left'>HSA Interest</div>
                        <div className='text-center'>$ {totalHsaInterest?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='text-left'>HSA Contributions</div>
                        <div className='text-center'>$ {totalHsaContribution?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                </div>
            </div>
        </div>


    )
}