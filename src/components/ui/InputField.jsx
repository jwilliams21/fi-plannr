

export const InputField = ({ id, label, error, registration, ...props }) => {

    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input 
                id={id}
                {...registration}
                {...props}
            />
            {error && <span>{error.message}</span>}
        </div>
    );
};