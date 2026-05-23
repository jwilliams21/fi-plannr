

export const Button = ({ children, onClick, variant, className, href, ...props }) => {

    const variants = {
        base: 'bg-green-500 text-white p-2 rounded-lg border-1 bg-emerald-500'
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
            onClick={onClick}
            className={`${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    )


}