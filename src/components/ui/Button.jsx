

export const Button = ({ children, onClick, variant, className, href, active, ...props }) => {

    const variants = {
        base: 'bg-emerald-500 text-white p-2 rounded-xl border-1 text-xl font-bold shadow-lg',
        toggle: active ? 'bg-emerald-500 text-white shadow-sm rounded-lg font-semibold' : 'text-slate-400 hover:text-emerald-500 hover:bg-emerald-100 rounded-lg font-semibold',
        fire: 'bg-red-900 text-amber-300 p-2 rounded-xl border-1' ,
        calc: 'bg-emerald-500 text-white p-2 rounded-xl border-1 text-xl font-bold shadow-lg md:p-4 md:mx-24 md:my-8 lg:mx-48'
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