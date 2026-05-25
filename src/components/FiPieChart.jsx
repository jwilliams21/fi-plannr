import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export const FiPieChart = ({ totalPrincipal, totalContributions, totalGrowth }) => {

    const data = [
        { name: 'Initial Principal', value: Number(totalPrincipal) || 0, color: '#6366f1' },
        { name: 'Your Contributions', value: Number(totalContributions) || 0, color: '#10b981' },
        { name: 'Compounded Growth', value: Number(totalGrowth) || 0, color: '#f59e0b' },
    ];

    const grandTotal = data.reduce((sum, item) => sum + item.value, 0);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    if (grandTotal === 0) {
        return (
            <div style={{ width: '100%', height: '300px' }} className="flex items-center justify-center bg-slate-800/50 rounded-xl border border-slate-700/50 text-slate-400">
                <p>Enter your financial data to generate chart breakdown...</p>
            </div>
        );
    }

    const chartKey = `${totalPrincipal}-${totalContributions}-${totalGrowth}`;

    return (
        <div style={{ width: '100%', height: '300px' }} >
            <PieChart key={chartKey} width={450} height={300}>
                <Pie
                    data={data}
                    dataKey='value'
                    nameKey='name'
                    cx={140} // Centers the circle perfectly horizontally
                    cy={140} // Centers the circle perfectly vertically
                    innerRadius={60}  // 🍩 Making this greater than 0 creates the donut hole
                    outerRadius={90}  // The thickness of the ring
                    paddingAngle={4}  // Puts a clean little gap between the slices
                    isAnimationActive={false}
                >
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend iconType="circle" layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
        </div>
    )
}