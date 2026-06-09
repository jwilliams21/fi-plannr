import { computedTypesResolver } from "@hookform/resolvers/computed-types";


export const fiMath = ({ startingAmt, duration, returnRate, addContribute, compoundFrequency, contributionTiming, contributionFrequency }) => {
    //loop through the data and return an array of objects - each object representing each year of the duration timeline
    const investLedger = [];

    const startingAmount = Number(startingAmt) || 0;
    const years = Number(duration) || 0;
    const numMonths = Number(duration * 12) || 0;
    const rate = Number((returnRate / 100)) || 0;
    const contributionAmt = Number(addContribute) || 0;
    let currentBalance = Number(startingAmt) || 0;
    let annualInterestTracker = 0;
    let annualContributionTracker = 0;


    let monthlyRate = 0;
    if(compoundFrequency === 'annual') {
        monthlyRate = Math.pow(1 + rate, 1 / 12) - 1;
    } else if (compoundFrequency === 'monthly') {
        monthlyRate = rate;
    }


    for(let currentMonth = 1; currentMonth <= numMonths; currentMonth++){
        const currentYear = currentMonth / 12;

        if(contributionTiming === 'beginning' && contributionFrequency === 'monthly') {
            currentBalance += contributionAmt;
            annualContributionTracker += contributionAmt;
        } 

        const monthInterest = currentBalance * monthlyRate;
        annualInterestTracker += monthInterest;
        currentBalance += monthInterest;

        if(contributionTiming === 'end' && contributionFrequency === 'monthly') {
            currentBalance += contributionAmt;
            annualContributionTracker += contributionAmt;
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