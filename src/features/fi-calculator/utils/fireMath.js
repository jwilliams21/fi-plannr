export const fireMath = ({ 
    currentAge, 
    fireAge, 
    currentAnnualExpenses, 
    totalBrokerage, 
    brokerageContribution, 
    brokerageReturnRate, 
    totalRoth, 
    rothContribution, 
    rothReturnRate, 
    totalTraditional, 
    traditionalContribution, 
    traditionalEmployerContribution, 
    traditionalReturnRate, 
    totalHsa, 
    hsaContributions, 
    hsaReturnRate,
    contributionTiming = 'beginning',
    contributionFrequency = 'monthly'
}) => {
    
    const fireLedger = [];

    const numAge = Number(currentAge) || 0;
    const numFireAge = Number(fireAge) || 0;
    const numFireToRetire = Number(60 - numFireAge) || 0;
    const numCurrentAnnualExpenses = Number(currentAnnualExpenses) || 0;

    const monthlyBrokerageContrib = Number(brokerageContribution) || 0;
    const monthlyRothContrib = Number(rothContribution) || 0;
    const monthlyTraditionalContrib = Number(traditionalContribution) || 0;
    const monthlyTraditionalEmployerContrib = Number(traditionalEmployerContribution) || 0;
    const monthlyHsaContrib = Number(hsaContributions) || 0;

    const numBrokerageReturnRate = Number(brokerageReturnRate) / 100 || 0;
    const numRothReturnRate = Number(rothReturnRate) / 100 || 0;
    const numTraditionalReturnRate = Number(traditionalReturnRate) / 100 || 0;
    const numHsaReturnRate = Number(hsaReturnRate) / 100 || 0;

    const brokerageMonthlyRate = Math.pow(1 + numBrokerageReturnRate, 1 / 12) - 1;
    const rothMonthlyRate = Math.pow(1 + numRothReturnRate, 1 / 12) - 1;
    const traditionalMonthlyRate = Math.pow(1 + numTraditionalReturnRate, 1 / 12) - 1;
    const hsaMonthlyRate = Math.pow(1 + numHsaReturnRate, 1 / 12) - 1;

    const numStartingBrokerage = Number(totalBrokerage) || 0;
    const numStartingRoth = Number(totalRoth) || 0;
    const numStartingTraditional = Number(totalTraditional) || 0;
    const numStartingHsa = Number(totalHsa) || 0;

    const calculateFutureExpenses = (currentExpenses, yearsOut, inflationRate = 0.03) => {
        return currentExpenses * Math.pow((1 + inflationRate), yearsOut);
    };

    const fireYearsOut = numFireAge - numAge;
    const totalFutureExpenses = calculateFutureExpenses(numCurrentAnnualExpenses, fireYearsOut);

    const sixtyYearsOut = 60 - numAge;
    const futureExpensesAtSixty = calculateFutureExpenses(numCurrentAnnualExpenses, sixtyYearsOut);

    let numTotalBrokerage = numStartingBrokerage;
    let numTotalRoth = numStartingRoth;
    let numTotalTraditional = numStartingTraditional;
    let numTotalHsa = numStartingHsa;

    let brokerageInterestTracker = 0;
    let brokerageContributionTracker = 0;
    let rothInterestTracker = 0;
    let rothContributionTracker = 0;
    let traditionalInterestTracker = 0;
    let traditionalContributionTracker = 0;
    let traditionalEmployerContributionTracker = 0;
    let hsaInterestTracker = 0;
    let hsaContributionTracker = 0;

    const endAge = Math.max(60, numFireAge);

    for (let age = numAge; age < endAge; age++) {
        // Stop contributions starting at fireAge
        const isPreFire = age < numFireAge;

        const currentBrokerageContrib = isPreFire ? monthlyBrokerageContrib : 0;
        const currentRothContrib = isPreFire ? monthlyRothContrib : 0;
        const currentTraditionalContrib = isPreFire ? monthlyTraditionalContrib : 0;
        const currentTraditionalEmployerContrib = isPreFire ? monthlyTraditionalEmployerContrib : 0;
        const currentHsaContrib = isPreFire ? monthlyHsaContrib : 0;

        for (let month = 1; month <= 12; month++) {
            const isFirstMonthOfYear = month === 1;
            const isLastMonthOfYear = month === 12;

            if (contributionTiming === 'beginning') {
                if (contributionFrequency === 'monthly' || (contributionFrequency === 'yearly' && isFirstMonthOfYear)) {
                    numTotalBrokerage += currentBrokerageContrib;
                    brokerageContributionTracker += currentBrokerageContrib;

                    numTotalRoth += currentRothContrib;
                    rothContributionTracker += currentRothContrib;

                    numTotalTraditional += currentTraditionalContrib + currentTraditionalEmployerContrib;
                    traditionalContributionTracker += currentTraditionalContrib;
                    traditionalEmployerContributionTracker += currentTraditionalEmployerContrib;

                    numTotalHsa += currentHsaContrib;
                    hsaContributionTracker += currentHsaContrib;
                }
            }

            const mBrokerageInterest = numTotalBrokerage * brokerageMonthlyRate;
            brokerageInterestTracker += mBrokerageInterest;
            numTotalBrokerage += mBrokerageInterest;

            const mRothInterest = numTotalRoth * rothMonthlyRate;
            rothInterestTracker += mRothInterest;
            numTotalRoth += mRothInterest;

            const mTraditionalInterest = numTotalTraditional * traditionalMonthlyRate;
            traditionalInterestTracker += mTraditionalInterest;
            numTotalTraditional += mTraditionalInterest;

            const mHsaInterest = numTotalHsa * hsaMonthlyRate;
            hsaInterestTracker += mHsaInterest;
            numTotalHsa += mHsaInterest;

            if (contributionTiming === 'end') {
                if (contributionFrequency === 'monthly' || (contributionFrequency === 'yearly' && isLastMonthOfYear)) {
                    numTotalBrokerage += currentBrokerageContrib;
                    brokerageContributionTracker += currentBrokerageContrib;

                    numTotalRoth += currentRothContrib;
                    rothContributionTracker += currentRothContrib;

                    numTotalTraditional += currentTraditionalContrib + currentTraditionalEmployerContrib;
                    traditionalContributionTracker += currentTraditionalContrib;
                    traditionalEmployerContributionTracker += currentTraditionalEmployerContrib;

                    numTotalHsa += currentHsaContrib;
                    hsaContributionTracker += currentHsaContrib;
                }
            }
        }

        fireLedger.push({
            age: age + 1, // Reflects ending age for the year
            fireAge: numFireAge,
            fireToRetire: numFireToRetire,
            annualExpenses: numCurrentAnnualExpenses,
            totalFutureExpenses: totalFutureExpenses,
            futureExpensesAtSixty: futureExpensesAtSixty,
            brokerageEndingBalance: numTotalBrokerage,
            brokerageContribution: brokerageContributionTracker,
            brokerageInterest: brokerageInterestTracker,
            rothEndingBalance: numTotalRoth,
            rothContribution: rothContributionTracker,
            rothInterest: rothInterestTracker,
            rothReturnRate: numRothReturnRate,
            traditionalEndingBalance: numTotalTraditional,
            traditionalContribution: traditionalContributionTracker,
            traditionalEmployerContribution: traditionalEmployerContributionTracker,
            traditionalInterest: traditionalInterestTracker,
            traditionalReturnRate: numTraditionalReturnRate, 
            hsaEndingBalance: numTotalHsa,
            hsaContribution: hsaContributionTracker,
            hsaInterest: hsaInterestTracker,
            hsaReturnRate: numHsaReturnRate,
            startingBrokerage: numStartingBrokerage,
            startingRoth: numStartingRoth,
            startingTraditional: numStartingTraditional,
            startingHsa: numStartingHsa
        });

        brokerageInterestTracker = 0;
        brokerageContributionTracker = 0;
        rothInterestTracker = 0;
        rothContributionTracker = 0;
        traditionalInterestTracker = 0;
        traditionalContributionTracker = 0;
        traditionalEmployerContributionTracker = 0;
        hsaInterestTracker = 0;
        hsaContributionTracker = 0;
    }

    return fireLedger;
};