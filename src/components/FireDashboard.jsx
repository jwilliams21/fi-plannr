import LabelInfo from './LabelInfo';

export default function FireDashboard({ results }) {

    if (!results || results.length === 0) {
        return <div></div>;
    }

    const fireAge = results?.[0]?.fireAge;

    // Find the specific ledger record for FIRE Age (falls back to last result if fireAge >= 60)
    const fireAgeResult = results?.find(r => r.age === fireAge) || results?.[results?.length - 1];

    // Filter results up to FIRE age for interest/contribution summations
    const preFireResults = results?.filter(r => r.age <= fireAge) || [];

    // Brokerage at FIRE Age
    const totalBrokerageEndingBalance = parseFloat(fireAgeResult?.brokerageEndingBalance) || 0;
    const totalBrokerageInterest = preFireResults.reduce((accumulator, currentAge) => {
        return accumulator + (parseFloat(currentAge.brokerageInterest) || 0);
    }, 0);
    const totalBrokerageContribution = preFireResults.reduce((accumulator, currentAge) => {
        return accumulator + (parseFloat(currentAge.brokerageContribution) || 0);
    }, 0);

    // Roth at FIRE Age
    const totalRothEndingBalance = parseFloat(fireAgeResult?.rothEndingBalance) || 0;
    const totalRothInterest = preFireResults.reduce((accumulator, currentAge) => {
        return accumulator + (parseFloat(currentAge.rothInterest) || 0);
    }, 0);
    const totalRothContribution = preFireResults.reduce((accumulator, currentAge) => {
        return accumulator + (parseFloat(currentAge.rothContribution) || 0);
    }, 0);

    // Traditional at FIRE Age
    const totalTraditionalEndingBalance = parseFloat(fireAgeResult?.traditionalEndingBalance) || 0;
    const totalTraditionalInterest = preFireResults.reduce((accumulator, currentAge) => {
        return accumulator + (parseFloat(currentAge.traditionalInterest) || 0);
    }, 0);
    const totalTraditionalContribution = preFireResults.reduce((accumulator, currentAge) => {
        return accumulator + (parseFloat(currentAge.traditionalContribution) || 0);
    }, 0);
    const totalTraditionalEmployerContribution = preFireResults.reduce((accumulator, currentAge) => {
        return accumulator + (parseFloat(currentAge.traditionalEmployerContribution) || 0);
    }, 0);

    // HSA at FIRE Age
    const totalHsaEndingBalance = parseFloat(fireAgeResult?.hsaEndingBalance) || 0;
    const totalHsaInterest = preFireResults.reduce((accumulator, currentAge) => {
        return accumulator + (parseFloat(currentAge.hsaInterest) || 0);
    }, 0);
    const totalHsaContribution = preFireResults.reduce((accumulator, currentAge) => {
        return accumulator + (parseFloat(currentAge.hsaContribution) || 0);
    }, 0);

    // Combined Results at FIRE Age
    const totalAfterFire = totalRothEndingBalance + totalTraditionalEndingBalance + totalHsaEndingBalance;
    const fireToRetire = fireAgeResult?.fireToRetire;
    const annualExpenses = fireAgeResult?.annualExpenses;
    const totalFutureExpenses = fireAgeResult?.totalFutureExpenses;
    const futureExpensesAtSixty = fireAgeResult?.futureExpensesAtSixty;

    // // Retirement Accounts at Age 60 (pulled directly from fireMath.js calculations, eliminating manual dashboard loop)
    // const sixtyResult = results?.find(r => r.age === 60) || results?.[results?.length - 1];
    // const runningRoth = parseFloat(sixtyResult?.rothEndingBalance) || 0;
    // const runningTraditional = parseFloat(sixtyResult?.traditionalEndingBalance) || 0;
    // const runningHsa = parseFloat(sixtyResult?.hsaEndingBalance) || 0;

    // const totalCombinedAtSixty = runningRoth + runningTraditional + runningHsa;
    // const totalRothTraditionalAtSixty = runningRoth + runningTraditional;
    // const fourPercentWithdrawlAnnual = totalRothTraditionalAtSixty * 0.04;
    // const expenseAtSixtyDiff = fourPercentWithdrawlAnnual - futureExpensesAtSixty;

    let brokerageWithdrawlRate = 0;
    if (fireToRetire > 10) {
        brokerageWithdrawlRate = 0.07;
    } else if (fireToRetire <= 10 && fireToRetire > 5) {
        brokerageWithdrawlRate = 0.09;
    } else {
        brokerageWithdrawlRate = 0.12;
    }

    const brokerageWithdrawlAmount = totalBrokerageEndingBalance * brokerageWithdrawlRate;
    const expenseDiff = brokerageWithdrawlAmount - totalFutureExpenses;

    const brokerageWithdrawlRateContent = (
        <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>If greater than 10 years, then 7% of the portfolio</li>
            <li>If less than 10 years, but greater than 5 years, then 9% of the portfolio</li>
            <li>If less than 5 years, then 12% of the portfolio</li>
        </ul>
    );

    return (
        <div>
            <div className='w-full px-2 md:w-3/4 md:mx-auto lg:text-xl xl:w-7/8'>
                <div className='xl:grid xl:grid-cols-2 xl:gap-8 xl:pb-12'>
                    <div>
                        <div className='w-full text-lg bg-emerald-600 text-white text-center font-bold py-1 rounded-lg'>
                            FIRE Results
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
                            <div className='lg:w-1/2 lg:px-0 mx-auto font-bold text-center px-2 text-white bg-sky-700 rounded-sm py-1 whitespace-nowrap'>$ {totalBrokerageEndingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            <div className='lg:pl-10'>
                                <LabelInfo 
                                    label='After-FIRE Funds'
                                    description={`These include your Roth, Traditional, & HSA. You will not have access to these until age 59 1/2. That means this money has ${fireToRetire} more years to compound!`}
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
                                    label='Overage or Deficient'
                                    description='Are you able to sustain your lifestyle and cover your expenses?'
                                    variant='result'
                                />
                            </div>
                            <div className='w-full text-left pl-1 lg:pl-10'>Annual {expenseDiff >= 0 ? 'Overage' : 'Deficient'}</div>
                            <div className={`lg:w-1/2 lg:px-0 mx-auto font-bold text-center px-2 text-white rounded-sm py-1 whitespace-nowrap ${expenseDiff >= 0 ? 'bg-emerald-600' : 'bg-rose-600'}`}>
                                $ {expenseDiff?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                            <div className='lg:pl-10'>
                                <LabelInfo 
                                    label='Annual Withdrawl'
                                    description={
                                        <>
                                            <p>This is how much your able to take from your brokerage account based on the number of years left until age 60.</p>
                                            {brokerageWithdrawlRateContent}
                                        </>
                                    }
                                    variant='result'
                                />
                            </div>
                            <div className='w-full text-left pl-1 lg:pl-10'>Annual Withdrawl</div>
                            <div>$ {brokerageWithdrawlAmount?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            <div className='lg:pl-10'>
                                <LabelInfo 
                                    label='Future Expenses'
                                    description='These are your projected annual expenses at your FIRE age using a 3% inflation rate per year'
                                    variant='result'
                                />
                            </div>
                            <div className='w-full text-left pl-1 lg:pl-10'>Future Expenses at {fireAge}</div>
                            <div>$ {totalFutureExpenses?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        </div>
                    </div>
                </div>

                <div className='xl:grid xl:grid-cols-2 xl:gap-8'>
                    <div>
                        <div className='w-full text-lg bg-emerald-600 text-white text-center font-bold py-1 rounded-lg'>Brokerage Results</div>
                        <div className='grid grid-cols-[2fr_1fr] lg:grid-cols-[2fr_2fr] gap-2 pl-2 pt-2 pb-4'>
                            <div className='font-bold text-left my-auto lg:pl-10'>Brokerage Balance</div>
                            <div className='lg:w-1/2 lg:px-0 mx-auto font-bold text-center px-2 text-white bg-sky-700 rounded-sm py-1 whitespace-nowrap'>$ {totalBrokerageEndingBalance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            <div className='text-left lg:pl-10'>Brokerage Interest</div>
                            <div className='text-center'>$ {totalBrokerageInterest?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            <div className='text-left lg:pl-10'>Brokerage Contributions</div>
                            <div className='text-center'>$ {totalBrokerageContribution?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        </div>
                    </div>

                    <div>
                        <div className='w-full text-lg bg-emerald-600 text-white text-center font-bold py-1 rounded-lg'>Roth Results</div>
                        <div className='grid grid-cols-[2fr_1fr] lg:grid-cols-[2fr_2fr] gap-2 pl-2 pt-2 pb-4'>
                            <div className='font-bold text-left my-auto lg:pl-10'>Roth Balance</div>
                            <div className='lg:w-1/2 lg:px-0 mx-auto font-bold text-center px-2 text-white bg-sky-700 rounded-sm py-1 whitespace-nowrap'>$ {totalRothEndingBalance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            <div className='text-left lg:pl-10'>Roth Interest</div>
                            <div className='text-center'>$ {totalRothInterest?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            <div className='text-left lg:pl-10'>Roth Contributions</div>
                            <div className='text-center'>$ {totalRothContribution?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        </div>
                    </div>

                    <div>
                        <div className='w-full text-lg bg-emerald-600 text-white text-center font-bold py-1 rounded-lg'>Traditional Results</div>
                        <div className='grid grid-cols-[2fr_1fr] lg:grid-cols-[2fr_2fr] gap-2 pl-2 pt-2 pb-4'>
                            <div className='font-bold text-left my-auto lg:pl-10'>Traditional Balance</div>
                            <div className='lg:w-1/2 lg:px-0 mx-auto font-bold text-center px-2 text-white bg-sky-700 rounded-sm py-1 whitespace-nowrap'>$ {totalTraditionalEndingBalance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            <div className='text-left lg:pl-10'>Traditional Interest</div>
                            <div className='text-center'>$ {totalTraditionalInterest?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            <div className='text-left lg:pl-10'>Traditional Contributions</div>
                            <div className='text-center'>$ {totalTraditionalContribution?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            <div className='text-left lg:pl-10'>Traditional Employer Contribution</div>
                            <div className='text-center'>$ {totalTraditionalEmployerContribution?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        </div>
                    </div>

                    <div>
                        <div className='w-full text-lg bg-emerald-600 text-white text-center font-bold py-1 rounded-lg'>HSA Results</div>
                        <div className='grid grid-cols-[2fr_1fr] lg:grid-cols-[2fr_2fr] gap-2 pl-2 pt-2 pb-4'>
                            <div className='font-bold text-left my-auto lg:pl-10'>HSA Balance</div>
                            <div className='lg:w-1/2 mx-auto font-bold text-center px-2 text-white bg-sky-700 rounded-sm py-1 whitespace-nowrap'>$ {totalHsaEndingBalance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            <div className='text-left lg:pl-10'>HSA Interest</div>
                            <div className='text-center'>$ {totalHsaInterest?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            <div className='text-left lg:pl-10'>HSA Contributions</div>
                            <div className='text-center'>$ {totalHsaContribution?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}