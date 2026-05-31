

export const Button = ({ children, onClick, variant, className, href, active, ...props }) => {

    const variants = {
        base: 'bg-emerald-500 text-white p-2 rounded-lg border-1 bg-emerald-500',
        toggle: active ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
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