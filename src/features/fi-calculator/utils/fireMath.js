
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
    tradtionalContribution, 
    traditionalEmployerContribution, 
    tradtionalReturnRate, 
    totalHsa, 
    hsaContributions, 
    hsaReturnRate }) => {
    
    const fireLedger = [];

    const numAge = Number(currentAge) || 0;
    const numFireAge = Number(fireAge) || 0;
    const numFireToRetire = Number(60 - numFireAge) || 0;
    const numCurrentAnnualExpenses = Number(currentAnnualExpenses) || 1;
    const numAnnualBrokerageContribution = Number(brokerageContribution) * 12 || 0;
    const numBrokerageReturnRate = Number(brokerageReturnRate) / 100 || 0.01;
    const numAnnualRothContribution = Number(rothContribution) * 12 || 0;
    const numRothReturnRate = Number(rothReturnRate) / 100 || 0.01;
    const numAnnualTraditionalContribution = Number(tradtionalContribution) * 12 || 0;
    const numAnnualTraditionalEmployerContribution = Number(traditionalEmployerContribution) * 12 || 0;
    const numTraditionalReturnRate = Number(tradtionalReturnRate) / 100 || 0.01;
    const numAnnualHsaContributions = Number(hsaContributions) * 12 || 0;
    const numHsaReturnRate = Number(hsaReturnRate) / 100 || 0.01;
    const numStartingBrokerage = Number(totalBrokerage) || 0;
    const numStartingRoth = Number(totalRoth) || 0;
    const numStartingTraditional = Number(totalTraditional) || 0;
    const numStartingHsa = Number(totalHsa) || 0;

    const calculateFutureExpenses = (currentExpenses, yearsOut, inflationRate = 0.03) => {
        return currentExpenses * Math.pow((1 + inflationRate), yearsOut)
    }

    const totalFutureExpenses = calculateFutureExpenses(numCurrentAnnualExpenses, ((numFireAge - numAge) + 1))

    let numTotalBrokerage = Number(totalBrokerage) || 0;
    let numTotalRoth = Number(totalRoth) || 0;
    let numTotalTraditional = Number(totalTraditional) || 0;
    let numTotalHsa = Number(totalHsa) || 0;
    let brokerageInterestTracker = 0;
    let brokerageContributionTracker = 0;
    let rothInterestTracker = 0;
    let rothContributionTracker = 0;
    let traditionalInterestTracker = 0;
    let traditionalContributionTracker = 0;
    let traditionalEmployerContributionTracker = 0;
    let hsaInterestTracker = 0;
    let hsaContributionTracker = 0;


    for(let age = numAge; age <= numFireAge; age++) {

        // Brokerage math
        const annualBrokerageInterest = (numTotalBrokerage * (1 + numBrokerageReturnRate)) - numTotalBrokerage;
        numTotalBrokerage += annualBrokerageInterest;
        numTotalBrokerage += numAnnualBrokerageContribution;
        brokerageInterestTracker += annualBrokerageInterest;
        brokerageContributionTracker += numAnnualBrokerageContribution;

        // Roth math
        const annualRothInterest = (numTotalRoth * (1 + numRothReturnRate)) - numTotalRoth;
        numTotalRoth += annualRothInterest;
        numTotalRoth += numAnnualRothContribution;
        rothInterestTracker += annualRothInterest;
        rothContributionTracker += numAnnualRothContribution;

        // Traditional math
        const annualTraditionalInterest = (numTotalTraditional * (1 + numTraditionalReturnRate)) - numTotalTraditional;
        numTotalTraditional += annualTraditionalInterest;
        numTotalTraditional += numAnnualTraditionalContribution;
        numTotalTraditional += numAnnualTraditionalEmployerContribution;
        traditionalInterestTracker += annualTraditionalInterest;
        traditionalContributionTracker += numAnnualTraditionalContribution;
        traditionalEmployerContributionTracker += numAnnualTraditionalEmployerContribution;

        // HSA math
        const annualHsaInterest = (numTotalHsa * (1 + numHsaReturnRate)) - numTotalHsa;
        numTotalHsa += annualHsaInterest;
        numTotalHsa += numAnnualHsaContributions;
        hsaInterestTracker += annualHsaInterest;
        hsaContributionTracker += numAnnualHsaContributions;


        fireLedger.push({
            age: age,
            fireAge: numFireAge,
            fireToRetire: numFireToRetire,
            annualExpenses: numCurrentAnnualExpenses,
            totalFutureExpenses: totalFutureExpenses,
            brokerageEndingBalance: numTotalBrokerage,
            brokerageContribution: brokerageContributionTracker,
            brokerageInterest: brokerageInterestTracker,
            rothEndingBalance: numTotalRoth,
            rothContribution: rothContributionTracker,
            rothInterest: rothInterestTracker,
            traditionalEndingBalance: numTotalTraditional,
            traditionalContribution: traditionalContributionTracker,
            traditionalEmployerContribution: traditionalEmployerContributionTracker,
            traditionalInterest: traditionalInterestTracker,
            hsaEndingBalance: numTotalHsa,
            hsaContribution: hsaContributionTracker,
            hsaInterest: hsaInterestTracker,
            startingBrokerage: numStartingBrokerage,
            startingRoth: numStartingRoth,
            startingTraditional: numStartingTraditional,
            startingHsa: numStartingHsa
        })


        brokerageInterestTracker = 0;
        brokerageContributionTracker = 0;
        rothInterestTracker = 0;
        rothContributionTracker = 0;
        traditionalInterestTracker = 0;
        traditionalContributionTracker = 0;
        traditionalEmployerContributionTracker = 0;
        hsaInterestTracker = 0;
        hsaContributionTracker = 0;
    };

    return fireLedger;
}