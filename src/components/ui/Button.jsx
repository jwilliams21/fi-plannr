

export const Button = ({ children, onClick, variant, className, href }) => {

    const variants = {
        base: 'bg-green-500 text-white p-2 rounded-lg'
    }

    if(href) {
        return (
            <a
            href={href}
            className={className}
            >
                {children}
            </a>
        );
    };

    return (
        <button
            onClick={onClick}
            className={className}
        >
            {children}
        </button>
    )


}