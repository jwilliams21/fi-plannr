import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export const FiPieChart = ({ results }) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
        return () => setIsMounted(false)
    }, [])

    if(!results || results.length === 0 || !Array.isArray(results) || !isMounted) {
        return (
            <div style={{ width: '100%', height: '300px' }} className="flex items-center justify-center bg-slate-800/50 rounded-xl border border-slate-700/50 text-blue-700">
                <p>Calculating financial projections...</p>
            </div>
        );
    }

    const cleanNum = (val) => {
        if (val === undefined || val === null || val === '') return 0;
        const parsed = parseFloat(val);
        return isNaN(parsed) ? 0 : Math.round(parsed * 100) / 100;
    }

    const principalNum = cleanNum(results[0]?.yearStartingAmt)

    const contributionsNum = results.reduce((sum, currentYear) => {
        if (!currentYear) return sum;
        const value = cleanNum(currentYear.yearAddContribute)
        return sum + (isNaN(value) ? 0 : value);
    }, 0)

    const growthNum = results.reduce((sum, currentYear) => {
        if (!currentYear) return sum;
        const value = cleanNum(currentYear.yearInterest)
        return sum + (isNaN(value) ? 0 : value);
    }, 0)

    console.log("results[0]", results[0]);

console.log(
  "starting",
  results[0]?.yearStartingAmt,
  typeof results[0]?.yearStartingAmt
);

console.log(
  "contribution",
  results[0]?.yearAddContribute,
  typeof results[0]?.yearAddContribute
);

console.log(
  "interest",
  results[0]?.yearInterest,
  typeof results[0]?.yearInterest
);

    const rawData = [
        { name: 'Starting Amount', value: Number(principalNum) || 0, color: '#6366f1' },
        { name: 'What You Did', value: Number(contributionsNum) || 0, color: '#10b981' },
        { name: 'What Compounding Interest Did', value: Number(growthNum) || 0, color: '#f59e0b' },
    ];

    const data = rawData.filter(item => item.value > 0 && !isNaN(item.value) && isFinite(item.value))

    const grandTotal = data.reduce((sum, item) => sum + item.value, 0);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    console.log("Chart Data Verification:", { principalNum, contributionsNum, growthNum, grandTotal });

    if (grandTotal <= 0 || data.length === 0 || isNaN(grandTotal) || !isFinite(grandTotal)) {
        return (
            <div style={{ width: '100%', height: '300px' }} className="flex items-center justify-center bg-slate-800/50 rounded-xl border border-slate-700/50 text-blue-700">
                <p>Calculating financial projections...</p>
            </div>
        );
    }

    const chartKey = `pie-${data.length}-${Math.floor(principalNum)}-${Math.floor(contributionsNum)}-${Math.floor(growthNum)}`;

//     console.log("Pie data:", data);
//     console.log("grandTotal:", grandTotal);
//     console.log(results[0]);
//     console.log(results);
//     data.forEach(item => {
//     console.log(
//         item.name,
//         item.value,
//         typeof item.value,
//         Number.isFinite(item.value)
//     );
// });
// console.log("Chart Data Verification:", {
//   principalNum,
//   contributionsNum,
//   growthNum,
//   grandTotal,
//   data,
//   results
// });


    return (
        <div style={{ width: '450px', height: '300px', display: 'block', margin: '0 auto' }}>
            <PieChart key={chartKey} width={450} height={300}>
                <Pie
                    data={data}
                    dataKey='value'
                    // nameKey='name'
                    // cx={150}
                    // cy={150} 
                    // startAngle={0}
                    // endAngle={360}
                    // innerRadius={60}  
                    // outerRadius={90}  
                    // paddingAngle={data.length > 1 ? 4 : 0}  
                    // isAnimationActive={false}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend iconType="circle" layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
        </div>
    );
}