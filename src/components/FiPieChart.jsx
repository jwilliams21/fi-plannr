import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const FiPieChart = ({ results }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    if (!results || results.length === 0 || !Array.isArray(results) || !isMounted) {
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

    const lastYearIndex = results.length - 1;
    const finalYearData = results[lastYearIndex];

    const principalNum = cleanNum(results[0]?.yearStartingAmt); 
    const contributionsNum = cleanNum(finalYearData?.yearAddContribute);
    const growthNum = cleanNum(finalYearData?.yearInterest);

    const rawData = [
        { name: 'Starting Amount', value: Math.round(principalNum), color: '#6366f1' },       // Indigo-500
        { name: 'Your Contributions', value: Math.round(contributionsNum), color: '#10b981' }, // Emerald-500
        { name: 'Investment Growth', value: Math.round(growthNum), color: '#f59e0b' },       // Amber-500
    ];

    const data = rawData.filter(item => item.value > 0);
    const grandTotal = data.reduce((sum, item) => sum + item.value, 0);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    if (grandTotal <= 0 || data.length === 0 || isNaN(grandTotal) || !isFinite(grandTotal)) {
        return (
            <div style={{ width: '100%', height: '300px' }} className="flex items-center justify-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500">
                <p>Awaiting valid numerical calculation records...</p>
            </div>
        );
    }

    const chartKey = `pie-${data.length}-${grandTotal}`;

    return (
        <div className="w-full h-[320px] block mx-auto">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart key={chartKey}>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="40%" 
                        cy="50%" 
                        startAngle={0}
                        endAngle={360}
                        innerRadius={65}  
                        outerRadius={95}  
                        paddingAngle={data.length > 1 ? 5 : 0}  
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
                        align="right" 
                        verticalAlign="middle"
                        wrapperStyle={{ paddingLeft: '10px' }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};