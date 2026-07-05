import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const FiPieChart = ({ results }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    if (!isMounted || !results || !Array.isArray(results) || results.length === 0) {
        return (
            <div style={{ width: '100%', height: '300px' }} className="flex items-center justify-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500">
                <p>Calculating financial projections...</p>
            </div>
        );
    }

    const cleanNum = (val) => {
        if (val === undefined || val === null || val === '') return 0;
        const parsed = parseFloat(val);
        return isNaN(parsed) || !isFinite(parsed) ? 0 : parsed;
    };

    // 2. Safe Data Extractions
    const principalNum = cleanNum(results[0]?.yearStartingAmt); 

    const contributionsNum = results.reduce((sum, currentYear) => {
        return sum + cleanNum(currentYear?.yearAddContribute);
    }, 0);

    const growthNum = results.reduce((sum, currentYear) => {
        return sum + cleanNum(currentYear?.yearInterest);
    }, 0);

    const rawData = [
        { name: 'Starting Amount', value: Math.round(principalNum) || 0, color: '#f59e0b' },       
        { name: 'Your Contributions', value: Math.round(contributionsNum) || 0, color: '#0ea5e9' }, 
        { name: 'Investment Growth', value: Math.round(growthNum) || 0, color: '#10b981' },       
    ];

    const data = rawData.filter(item => item.value > 0);
    const grandTotal = data.reduce((sum, item) => sum + item.value, 0);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value || 0);
    };

    if (grandTotal <= 0 || data.length === 0 || isNaN(grandTotal) || !isFinite(grandTotal)) {
        return (
            <div style={{ width: '100%', height: '300px' }} className="flex items-center justify-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500">
                <p>Awaiting calculations...</p>
            </div>
        );
    }

    return (
        <div className="w-full h-[300px] block mx-auto text-left focus:outline-none overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart height={300} className='outline-none'>
                    <Pie
                        data={data}
                        dataKey="value"
                        cx="50%"  
                        cy="50%"   
                        innerRadius={50}  
                        outerRadius={95}  
                        isAnimationActive={false}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend 
                        iconType="circle" 
                        layout="vertical" 
                        align="center"
                        verticalAlign="bottom"
                        formatter={(value, entry) => {
                            const total = data.reduce((sum, item) => sum + item.value, 0);
                            const currentVal = entry.payload?.value || 0;
                            const percentage = total > 0 ? ((currentVal / total) * 100).toFixed(1) : 0;

                            return(
                                <span className='font-bold'>
                                    {value} <span className='font-bold pl-4'>({percentage})%</span>
                                </span>
                            )
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};