

export const fiMath = ({ startingAmt, duration, returnRate, addContribute }) => {
    //loop through the data and return an array of objects - each object representing each year of the duration timeline
    const investLedger = [];

    const start = Number(startingAmt) || 0;
    const years = Number(duration) || 0;
    const rate = Number(returnRate) || 0;
    const contribution = Number(addContribute) || 0;

    for(let currentYear = 1; currentYear <= years; currentYear++){
        let lastYearBalance = investLedger.length > 0 ? investLedger[investLedger.length - 1].yearEndingBalance : startingAmt;

        const calInterest = rate/100 + 1;
        const yearCompInterestTotal = (lastYearBalance + contribution) * calInterest;
        const yearInterest = yearCompInterestTotal - (lastYearBalance + contribution);

        investLedger.push({
            year: currentYear,
            yearStartingAmt: Math.round(lastYearBalance * 100) / 100,
            yearAddContribute: Math.round(contribution * 100) / 100,
            yearInterest: Math.round(yearInterest * 100) / 100,
            yearEndingBalance: Math.round(yearCompInterestTotal * 100) / 100
        })
    }

    return investLedger;
};

// Make this function do one thing: calculate the baseline trajectory array based on the numbers it is given.  
// Keep the data raw (no formatting currencies, creating strings, etc.)