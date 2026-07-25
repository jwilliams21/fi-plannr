

export const Button = ({ children, onClick, variant, className, href, active, ...props }) => {

    const variants = {
        base: 'cursor-pointer bg-emerald-600 text-white p-2 rounded-xl border-1 text-xl font-bold shadow-lg',
        toggle: active ? 'cursor-pointer bg-emerald-600 text-white shadow-sm rounded-lg font-semibold' : 'cursor-pointer text-slate-400 hover:text-emerald-600 rounded-lg font-semibold',
        fire: 'cursor-pointer bg-red-900 text-amber-300 p-2 rounded-xl border-1' ,
        calc: 'cursor-pointer bg-emerald-600 text-white py-2 px-12 rounded-2xl border-1 text-xl font-bold shadow-lg max-w-[320px] lg:max-w-[480px]',
        fireCalc: 'cursor-pointer bg-linear-to-r from-amber-300 via-orange-500 to-red-700 text-white py-4 px-6 rounded-2xl border-1 text-xl font-bold shadow-lg max-w-[320px] lg:max-w-[480px]',
    }

    if(href) {
        return (
            <a
            href={href}
            className={`${variants[variant]} ${className}`}
            >
                {children}
            </a>
        );
    };

    return (
        <button
            type='button'
            onClick={onClick}
            className={`${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    )


}