

export const fiMath = ({ startingAmt, duration, returnRate, addContribute }) => {
    //loop through the data and return an array of objects - each object representing each year of the duration timeline
    const investLedger = [];

    for(let currentYear = 1; currentYear <= duration; currentYear++){
        let lastYearBalance = Number((investLedger.length > 0 ? investLedger[investLedger.length - 1].yearEndingBalance : startingAmt).toFixed(2));

        const calInterest = Number((returnRate/100 + 1).toFixed(2));
        const yearCompInterestTotal = Number(((lastYearBalance + addContribute) * calInterest).toFixed(2));
        const yearInterest = Number((yearCompInterestTotal - (lastYearBalance + addContribute)).toFixed(2));

        investLedger.push({
            year: currentYear,
            yearStartingAmt: lastYearBalance,
            yearAddContribute: addContribute,
            yearInterest: yearInterest,
            yearEndingBalance: yearCompInterestTotal
        })
    }

    return investLedger;
};

// Make this function do one thing: calculate the baseline trajectory array based on the numbers it is given.  
// Keep the data raw (no formatting currencies, creating strings, etc.)