

export const Button = ({ children, onClick, variant, className, href, active, ...props }) => {

    const variants = {
        base: 'bg-emerald-500 text-white p-2 rounded-xl border-1 text-xl font-bold',
        toggle: active ? 'bg-emerald-500 text-white shadow-sm rounded-lg font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 rounded-lg font-semibold',
        fire: 'bg-red-900 text-amber-300 p-2 rounded-xl border-1'
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