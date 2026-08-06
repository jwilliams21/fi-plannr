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
            <div className='w-full px-2 md:w-3/4 md:mx-auto lg:text-xl'>
                <div>
                    <div className='w-full text-lg bg-emerald-600 text-white text-center font-bold py-1 rounded-lg'>
                        FIRE Results at {fireAge}
                    </div>
                    <div className='grid grid-cols-[25px_2fr_1.2fr] lg:grid-cols-[100px_1.8fr_2fr] place-items-center gap-2 pt-2 pb-4 pl-2'>
                        <div className='lg:pl-10'>
                            <LabelInfo 
                            label='FIRE Balance'
                            description='Total Brokerage Balance At FIRE Age'
                            variant='result'
                            />
                        </div>
                        <div className='w-full text-left font-bold pl-1 lg:pl-10'>FIRE Balance</div>
                        <div className='lg:w-1/4 lg:px-0 mx-auto font-bold text-center px-2 text-white bg-sky-700 rounded-sm py-1 whitespace-nowrap'>$ {totalBrokerageEndingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='lg:pl-10'>
                            <LabelInfo 
                            label='After-FIRE Funds'
                            description={`These include your Roth, Traditional, & HSA.  You will not have access to these until age 59 1/2.  That means this money has ${fireToRetire} more years to compound!`}
                            variant='result'
                            />
                        </div>
                        <div className='w-full text-left pl-1 lg:pl-10'>After-FIRE Funds</div>
                        <div>$ {totalAfterFire.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                </div>

                <div>
                    <div className='w-full text-lg bg-emerald-600 text-white text-center font-bold py-1 rounded-lg'>Are you ready to be FI at age {fireAge}?</div>
                    <div className='grid grid-cols-[25px_2fr_1.2fr] lg:grid-cols-[100px_1.8fr_2fr] gap-2 place-items-center pt-2 pb-4 pl-2'>
                        <div className='lg:pl-10'>
                            <LabelInfo 
                            label='Current Annual Expenses'
                            description='These are the annual expenses you noted in the filters above'
                            variant='result'
                            />
                        </div>
                        <div className='w-full text-left pl-1 lg:pl-10'>Annual Expenses</div>
                        <div>$ {annualExpenses?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='lg:pl-10'>
                            <LabelInfo 
                            label='Future Expenses'
                            description='These are your projected annual expenses at your FIRE age using a 3% inflation rate per year'
                            variant='result'
                            />
                        </div>
                        <div className='w-full text-left pl-1 lg:pl-10'>Future Expenses at {fireAge}</div>
                        <div>$ {totalFutureExpenses?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='lg:pl-10'>
                            <LabelInfo 
                            label='Annual Withdrawl'
                            description={`This is how much your able to take from your brokerage account based on the number of years left until age 60.  
                            ${brokerageWithdrawlRateContent}`}
                            variant='result'
                            />
                        </div>
                        <div className='w-full text-left pl-1 lg:pl-10'>Annual Withdrawl</div>
                        <div>$ {brokerageWithdrawlAmount?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='lg:pl-10'>
                            <LabelInfo 
                            label='Overage or Deficient'
                            description='Are you able to sustain your lifestyle and cover your expenses?'
                            variant='result'
                            />
                        </div>
                        <div className='w-full text-left pl-1 lg:pl-10'>Annual {expenseDiff >= 0 ? 'overage' : 'deficient'}</div>
                        <div className={`lg:w-1/4 lg:px-0 mx-auto font-bold text-center px-2 text-white rounded-sm py-1 whitespace-nowrap  ${expenseAtSixtyDiff >=0 ? 'bg-emerald-600' : 'bg-rose-600'}`}>
                            $ {expenseDiff?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                    </div>
                </div>

                <div>
                    <div className='w-full text-lg bg-emerald-600 text-white text-center font-bold py-1 rounded-lg'>Retirement accounts at age 60</div>
                    <div className='grid grid-cols-[25px_2fr_1.2fr] lg:grid-cols-[100px_1.8fr_2fr] gap-2 place-items-center pt-2 pb-4 pl-2'>
                        <div className='lg:pl-10'>
                            <LabelInfo 
                            label='Balance'
                            description='How much are your accounts worth at age 60?'
                            variant='result'
                            />
                        </div>
                        <div className='w-full text-left pl-1 lg:pl-10'>Balance</div>
                        <div>$ {totalCombinedAtSixty?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='lg:pl-10'>
                            <LabelInfo 
                            label='Account Withdrawl'
                            description='Retirement account withdrawl at 4%'
                            variant='result'
                            />
                        </div>
                        <div className='w-full text-left pl-1 lg:pl-10'>Account Withdrawl</div>
                        <div>$ {fourPercentWithdrawlAnnual?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='lg:pl-10'>
                            <LabelInfo 
                            label='Expenses at 60'
                            description='What are your annual expenses once you reach 60 years old?'
                            variant='result'
                            />
                        </div>
                        <div className='w-full text-left pl-1 lg:pl-10'>Future Expenses at 60</div>
                        <div>$ {futureExpensesAtSixty?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='lg:pl-10'>
                            <LabelInfo 
                            label='Ahead or Behind?'
                            description='What is the delta between your withdrawl amount and future expenses?'
                            variant='result'
                            />
                        </div>
                        <div className={`${expenseAtSixtyDiff > 9999 ? 'w-full' : 'w-full'} text-left pl-1 lg:pl-10`}>Annual {expenseDiff >= 0 ? 'overage' : 'deficient'}</div>
                        <div className={`lg:w-1/4 lg:px-0 mx-auto font-bold text-center px-2 text-white rounded-sm py-1 whitespace-nowrap  ${expenseAtSixtyDiff >=0 ? 'bg-emerald-600' : 'bg-rose-600'}`}>
                            $ {expenseAtSixtyDiff?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                    </div>
                </div>

                <div>
                    <div className='w-full text-lg bg-emerald-600 text-white text-center font-bold py-1 rounded-lg'>Brokerage Results at {fireAge}</div>
                    <div className='grid grid-cols-[2fr_1fr] lg:grid-cols-[2fr_2fr] gap-2 pl-2 pt-2 pb-4'>
                        <div className='font-bold text-left my-auto lg:pl-10'>Brokerage Balance</div>
                        <div className='lg:w-1/4 lg:px-0 mx-auto font-bold text-center px-2 text-white bg-sky-700 rounded-sm py-1 whitespace-nowrap'>$ {totalBrokerageEndingBalance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='text-left lg:pl-10'>Brokerage Interest</div>
                        <div className='text-center'>$ {totalBrokerageInterest?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='text-left lg:pl-10'>Brokerage Contributions</div>
                        <div className='text-center'>$ {totalBrokerageContribution?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                </div>

                <div>
                    <div className='w-full text-lg bg-emerald-600 text-white text-center font-bold py-1 rounded-lg'>Roth Results at {fireAge}</div>
                    <div className='grid grid-cols-[2fr_1fr] lg:grid-cols-[2fr_2fr] gap-2 pl-2 pt-2 pb-4'>
                        <div className='font-bold text-left my-auto lg:pl-10'>Roth Balance</div>
                        <div className='lg:w-1/4 lg:px-0 mx-auto font-bold text-center px-2 text-white bg-sky-700 rounded-sm py-1 whitespace-nowrap'>$ {totalRothEndingBalance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='text-left lg:pl-10'>Roth Interest</div>
                        <div className='text-center'>$ {totalRothInterest?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='text-left lg:pl-10'>Roth Contributions</div>
                        <div className='text-center'>$ {totalRothContribution?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                </div>

                <div>
                    <div className='w-full text-lg bg-emerald-600 text-white text-center font-bold py-1 rounded-lg'>Traditional Results at {fireAge}</div>
                    <div className='grid grid-cols-[2fr_1fr] lg:grid-cols-[2fr_2fr] gap-2 pl-2 pt-2 pb-4'>
                        <div className='font-bold text-left my-auto lg:pl-10'>Traditional Balance</div>
                        <div className='lg:w-1/4 lg:px-0 mx-auto font-bold text-center px-2 text-white bg-sky-700 rounded-sm py-1 whitespace-nowrap'>$ {totalTraditionalEndingBalance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='text-left lg:pl-10'>Traditional Interest</div>
                        <div className='text-center'>$ {totalTraditionalInterest?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='text-left lg:pl-10'>Traditional Contributions</div>
                        <div className='text-center'>$ {totalTraditionalContribution?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='text-left lg:pl-10'>Traditional Employer Contribution</div>
                        <div className='text-center'>$ {totalTraditionalEmployerContribution?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                </div>
                <div>
                    <div className='w-full text-lg bg-emerald-600 text-white text-center font-bold py-1 rounded-lg'>HSA Results at {fireAge}</div>
                    <div className='grid grid-cols-[2fr_1fr] lg:grid-cols-[2fr_2fr]  gap-2 pl-2 pt-2 pb-4'>
                        <div className='font-bold text-left my-auto lg:pl-10'>HSA Balance</div>
                        <div className='lg:w-1/4 mx-auto font-bold text-center px-2 text-white bg-sky-700 rounded-sm py-1 whitespace-nowrap'>$ {totalHsaEndingBalance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='text-left lg:pl-10'>HSA Interest</div>
                        <div className='text-center'>$ {totalHsaInterest?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        <div className='text-left lg:pl-10'>HSA Contributions</div>
                        <div className='text-center'>$ {totalHsaContribution?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                </div>
            </div>
        </div>


    )
}