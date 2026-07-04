
export const basicMath = ({ startingAmt, duration, returnRate, addContribute, contributionTiming, contributionFrequency }) => {
    //loop through the data and return an array of objects - each object representing each year of the duration timeline
    const investLedger = [];

    const years = Number(duration) || 0;
    const numMonths = Number(duration * 12) || 0;
    const rate = Number((returnRate / 100)) || 0;
    const contributionAmt = Number(addContribute) || 0;
    const monthlyRate = Math.pow(1 + rate, 1 / 12) - 1;
    let currentBalance = Number(startingAmt) || 0;
    let annualInterestTracker = 0;
    let annualContributionTracker = 0;



    for(let currentMonth = 1; currentMonth <= numMonths; currentMonth++){
        const currentYear = currentMonth / 12;

        const isFirstMonthOfYear = (currentMonth - 1) % 12 === 0;
        const isLastMonthOfYear = currentMonth % 12 === 0;

        if(contributionTiming === 'beginning') {
            if(contributionFrequency === 'monthly' || (contributionFrequency === 'yearly' && isFirstMonthOfYear)) {
                currentBalance += contributionAmt;
                annualContributionTracker += contributionAmt;
            }
        }

        const monthInterest = currentBalance * monthlyRate;
        annualInterestTracker += monthInterest;
        currentBalance += monthInterest;

        if(contributionTiming === 'end') {
            if(contributionFrequency === 'monthly' || (contributionFrequency === 'yearly' && isLastMonthOfYear)){
                currentBalance += contributionAmt;
                annualContributionTracker += contributionAmt;
            }
        }


        if(currentMonth % 12 === 0) {
            let lastYearBalance = investLedger.length > 0 ? investLedger[investLedger.length - 1].yearEndingBalance : startingAmt;    

            investLedger.push({
                year: currentYear,
                yearStartingAmt: lastYearBalance,
                yearAddContribute: annualContributionTracker,
                yearInterest: annualInterestTracker,
                yearEndingBalance: currentBalance
            })

            annualInterestTracker = 0;
            annualContributionTracker = 0;
        }

    }

    return investLedger;
};

// Make this function do one thing: calculate the baseline trajectory array based on the numbers it is given.  
// Keep the data raw (no formatting currencies, creating strings, etc.)