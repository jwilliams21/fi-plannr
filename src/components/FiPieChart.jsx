import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MoveRight } from 'lucide-react';

export const FiPieChart = ({ results }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    // useEffect(() => {
    //     const mediaQuery = window.matchMedia('(max-w: 767px)');
    //     setIsMobile(mediaQuery.matches);
    //     const handleResize = (e) => setIsMobile(e.matches);
    //     mediaQuery.addEventListener('change', handleResize);

    //     return () => mediaQuery.removeEventListener('change', handleResize)
    // }, [])

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
        { name: 'Starting Amount', value: Math.round(principalNum) || 0, color: '#FBBF24' },       
        { name: 'Your Contributions', value: Math.round(contributionsNum) || 0, color: '#6366F1' }, 
        { name: 'Investment Growth', value: Math.round(growthNum) || 0, color: '#059669' },       
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

    // block mx-auto text-left focus:outline-none overflow-hidden

    return (
        <div className='flex flex-col md:flex-row items-center w-full mx-auto max-w-4xl justify-center gap-6 p-4'>
            <div className="w-full h-[300px] flex justify-center items-center">
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
                            layout={isMobile ? 'horizontal' : 'vertical'}
                            align={isMobile ? 'center' : 'right'}
                            verticalAlign={isMobile ? 'bottom' : 'middle'}
                            formatter={(value, entry) => {
                                const total = data.reduce((sum, item) => sum + item.value, 0);
                                const currentVal = entry.payload?.value || 0;
                                const percentage = total > 0 ? ((currentVal / total) * 100).toFixed(1) : 0;

                                return(
                                    <span className='inline-flex gap-2 font-bold mb-1 lg:text-xl'>
                                        <span>{value}</span>
                                        <MoveRight />
                                        <span className='font-bold'>{percentage}%</span>
                                    </span>
                                )
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};