

export const fiMath = ({ startingAmt, duration, returnRate, addContribute }) => {
    console.log({ startingAmt, duration, returnRate, addContribute });

    //loop through the data and return an array of objects - each object representing each year of the duration timeline
    const investLedger = [];

    for(let currentYear = 1; currentYear <= duration; currentYear++){
        const calInterest = (returnRate/100) + 1
        const yearCompInterstTotal = (startingAmt + addContribute) * calInterest;
        const totalInterest = yearCompInterstTotal - (startingAmt + addContribute)

        investLedger.push({
            year: currentYear,
            startingAmt: startingAmt,
            addContribute: addContribute,
            totalInterest: totalInterest,
            endingBalance: yearCompInterstTotal
        })
    }

    console.log(investLedger)
    return investLedger;
};

// Make this function do one thing: calculate the baseline trajectory array based on the numbers it is given.  
// Keep the data raw (no formatting currencies, creating strings, etc.)