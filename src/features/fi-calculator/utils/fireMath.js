
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

        console.log('made it fireMath.js')
    
    const fireLedger = [];

    const numAge = Number(currentAge) || 0;
    const numFireAge = Number(fireAge) || 0;
    const numCurrentAnnualExpenses = Number(currentAnnualExpenses) || 1;
    const numTotalBrokerage = Number(totalBrokerage) || 0;
    const numAnnualBrokerageContribution = Number(brokerageContribution) * 12 || 0;
    const numBrokerageReturnRate = Number(brokerageReturnRate) / 100 || 0.01;
    const numTotalRoth = Number(totalRoth) || 0;
    const numAnnualRothContribution = Number(rothContribution) * 12 || 0;
    const numRothReturnRate = Number(rothReturnRate) / 100 || 0.01;
    const numTotalTraditional = Number(totalTraditional) || 0;
    const numAnnualTraditionalContribution = Number(tradtionalContribution) *12 || 0;
    const numAnnualTraditionalEmployerContribution = Number(traditionalEmployerContribution) * 12 || 0;
    const numTraditionalReturnRate = Number(tradtionalReturnRate) / 100 || 0.01;
    const numTotalHsa = Number(totalHsa) || 0;
    const numAnnualHsaContributions = Number(hsaContributions) * 12 || 0;
    const numHsaReturnRate = Number(hsaReturnRate) / 100 || 0.01;
    let brokerageInterestTracker = 0;
    let brokerageContributionTracker = 0;
    let rothInterestTracker = 0;
    let rothContributionTracker = 0;
    let traditionInterestTracker = 0;
    let traditionalContributionTracker = 0;
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
        traditionalContributionTracker += numAnnualTraditionalEmployerContribution;

        // HSA math
        const annualHsaInterest = (numTotalHsa * (1 + numHsaReturnRate)) - numTotalHsa;
        numTotalHsa += annualHsaInterest;
        numTotalHsa += numAnnualHsaContributions;
        hsaInterestTracker += annualHsaInterest;
        hsaContributionTracker += numAnnualHsaContributions;





        // let lastYearBalance = investLedger.length > 0 ? investLedger[investLedger.length - 1].yearEndingBalance : startingAmt;    

        //     investLedger.push({
        //         year: currentYear,
        //         yearStartingAmt: lastYearBalance,
        //         yearAddContribute: annualContributionTracker,
        //         yearInterest: annualInterestTracker,
        //         yearEndingBalance: currentBalance
        //     })

        //     annualInterestTracker = 0;
        //     annualContributionTracker = 0;

    }


}